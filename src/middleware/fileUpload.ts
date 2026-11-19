
import "dotenv/config";
import * as tus from "tus-js-client";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const bucket = process.env.SUPABASE_BUCKET!;

if (!SUPABASE_URL || !SUPABASE_KEY || !bucket) {
  throw new Error("Configurações do Supabase incompletas.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Endpoint TUS com hostname direto do Storage
function getTusEndpoint(): string {
  const url = new URL(SUPABASE_URL);

  const match = url.hostname.match(/^([^.]+)\.supabase\.co$/);

  if (match) {
    return `https://${match[1]}.storage.supabase.co/storage/v1/upload/resumable`;
  }

  // Fallback para projetos com domínio personalizado
  return `${url.origin}/storage/v1/upload/resumable`;
}

const TUS_ENDPOINT = getTusEndpoint();

// Configurações de transferência
const CHUNK_SIZE = 6 * 1024 * 1024;

const RETRY_DELAYS = [
  0,
  3000,
  5000,
  10000,
  20000,
];

// Converter stream para Buffer
export async function streamToBuffer(
  stream: NodeJS.ReadableStream
): Promise<Buffer> {
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk)
    );
  }

  return Buffer.concat(chunks);
}

// Upload resumível com TUS
async function resumableUpload(
  caminho: string,
  arquivo: Buffer,
  mimetype: string,
  upsert = false
): Promise<void> {

  console.log("=================================");
  console.log("A iniciar upload TUS...");
  console.log("Ficheiro:", caminho);
  console.log(
    "Tamanho:",
    (arquivo.length / 1024 / 1024).toFixed(2),
    "MB"
  );

  return new Promise((resolve, reject) => {

    let ultimoProgresso = -1;

    const upload = new tus.Upload(arquivo, {

      endpoint: TUS_ENDPOINT,

      retryDelays: RETRY_DELAYS,

      chunkSize: CHUNK_SIZE,

      headers: {
        authorization: `Bearer ${SUPABASE_KEY}`,
        apikey: SUPABASE_KEY,
        "x-upsert": String(upsert),
      },

      metadata: {
        bucketName: bucket,
        objectName: caminho,
        contentType: mimetype,
        cacheControl: "3600",
      },

      uploadDataDuringCreation: false,

      removeFingerprintOnSuccess: true,

      onProgress: (bytesUploaded: number, bytesTotal: number) => {
        const progresso = Math.floor(
          (bytesUploaded / bytesTotal) * 100
        );

        if (progresso !== ultimoProgresso) {
          ultimoProgresso = progresso;

          console.log(
            `Upload ${caminho}: ${progresso}%`
          );
        }
      },

      onChunkComplete: (
        chunkSize: any,
        bytesAccepted: any,
        bytesTotal: any
      ) => {
        console.log(
          `Bloco confirmado: ${bytesAccepted}/${bytesTotal} bytes`
        );
      },

      onShouldRetry: (error: { originalResponse: { getStatus: () => any; }; }, retryAttempt: number) => {
        const status = error.originalResponse
          ? error.originalResponse.getStatus()
          : 0;

        // Não repetir erros de autenticação ou validação
        if (
          status === 400 ||
          status === 401 ||
          status === 403 ||
          status === 404 ||
          status === 413 ||
          status === 415
        ) {
          return false;
        }

        console.warn(
          `Interrupção na transferência. Tentativa ${retryAttempt + 1}`
        );

        return true;
      },

      onError: (error: any) => {
        console.error(
          "Falha definitiva no upload TUS:",
          error
        );

        reject(error);
      },

      onSuccess: () => {
        console.log("Upload concluído com sucesso!");
        console.log("Caminho:", caminho);
        console.log("=================================");

        resolve();
      },
    });

    upload.start();
  });
}

// Upload de novo ficheiro
export async function fileUpload(
  local: string,
  idLocal: number,
  typeFile: string,
  filename: string,
  arquivo: Buffer,
  mimetype: string
) {

  console.log("Bytes recebidos:", arquivo.length);

  const extensao = filename.split(".").pop() || "bin";

  const identificador = randomUUID();

  const novoFilename = `${identificador}.${extensao}`;

  const caminho =
    `${local}/${idLocal}/${typeFile}/${novoFilename}`;

  await resumableUpload(
    caminho,
    arquivo,
    mimetype,
    false
  );

  return {
    filename: novoFilename,
    path: caminho,
  };
}

// Gerar URL temporária
export async function getFileUrl(caminho: string) {

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(caminho, 60 * 60);

  if (error) {
    console.error("Erro ao gerar URL:", error);
    throw error;
  }

  return data.signedUrl;
}

// Eliminar ficheiro
export async function deleteFile(path: string) {

  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error("Erro ao eliminar arquivo:", error);
    throw error;
  }

  return data;
}

// Atualizar ficheiro utilizando TUS
export async function updateFile(
  path: string,
  arquivo: Buffer,
  mimetype: string
) {

  await resumableUpload(
    path,
    arquivo,
    mimetype,
    true
  );

  return {
    path,
  };
}
