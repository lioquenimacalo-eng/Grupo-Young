import { ImoveisController } from "@controller/imovelController";
import { FastifyTypeInstance } from "types/types";
import z from "zod";
import { TipoImovel, Finalidade, status, TipoStatus } from "generated/prisma/enums";

const campoSchema = z.object({
  value: z.string().min(1, "Campo obrigatório"),
});

const statusUpload = z.object({
  value: z
    .string()
    .optional()
    .transform((val) => val as TipoStatus | undefined)
    .refine((val) => val === undefined || Object.values(TipoStatus).includes(val), {
      message: "Status de upload inválido.",
    }),
});

const tipoImovel = z.object({
  value: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((val) => Object.values(TipoImovel).includes(val as TipoImovel), {
      message: "Selecione um tipo de imóvel válido.",
    })
    .transform((val) => val as TipoImovel),
});

const finalidade = z.object({
  value: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((val) => Object.values(Finalidade).includes(val as Finalidade), {
      message: "Selecione Venda ou Aluguer.",
    })
    .transform((val) => val as Finalidade),
});

const preco = z.object({
  value: z
    .string()
    .min(1, "Informe o preço.")
    .transform((val) => Number(val))
    .refine((val) => Number.isFinite(val) && val > 0, {
      message: "Informe um preço válido.",
    }),
});

const quartos = z.object({
  value: z
    .string()
    .min(1, "Informe a quantidade de quartos.")
    .transform(Number)
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: "Quantidade de quartos inválida.",
    }),
});

const Wc = z.object({
  value: z
    .string()
    .min(1, "Informe a quantidade de WC.")
    .transform(Number)
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: "Quantidade de WC inválida.",
    }),
});

const estado = z.object({
  value: z
    .string()
    .optional()
    .refine((val) => val === undefined || Object.values(status).includes(val as status), {
      message: "Estado inválido.",
    })
    .transform((val) => val as status | undefined),
});

const dateSchema = z.object({
  value: z
    .string()
    .min(1, "Campo obrigatório")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Data inválida. Use o formato AAAA-MM-DD",
    })
    .transform((val) => new Date(val)),
});

const idArquivoSchema = z.object({
  value: z.preprocess(
    (valor) => {
      if (typeof valor === "string") {
        try {
          return JSON.parse(valor);
        } catch {
          const id = Number(valor);
          return Number.isFinite(id) ? id : valor;
        }
      }

      return valor;
    },
    z.union([z.number().int().positive(), z.array(z.number().int().positive())]).optional(),
  ),
});

export async function actividadeRouter(app: FastifyTypeInstance) {
  const controllerImovel = new ImoveisController();

  app.post(
    "/createImoveis",
    {
      schema: {
        description: "Cadastrar um novo Imóvel",
        tags: ["Imóvel"],
        body: z.object({
          titulo: campoSchema,
          descricao: campoSchema,
          dimensao: campoSchema,
          localizacao: campoSchema,
          preco: preco,
          quartos: quartos,
          wc: Wc,
          tipoImovel: tipoImovel,
          finalidade: finalidade,
          estado: estado,
          arquivo: z.any(),
        }),

        response: {
          201: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.object({
              idImovel: z.number(),
              titulo: z.string(),
              localizacao: z.string(),
              dataImovel: z.date(),
              descricao: z.string(),
              preco: z.number(),
              dimensao: z.string(),
              quartos: z.number(),
              wc: z.number(),
              tipoImovel: z.string(),
              finalidade: z.string(),
              statusUpload: z.string(),
              fileUrls: z.array(
                z.object({
                  filename: z.string(),
                  tipoFile: z.string(),
                  url: z.string().url(),
                }),
              ),
            }),
          }),
        },
      },
    },

    async (req, res) => controllerImovel.CreateImovel(req, res),
  );

  app.get(
    "/getManyImoveis",
    {
      schema: {
        description: "Buscar todos os Imovel existentes",
        tags: ["Imóvel"],
        response: {
          200: z.object({
            success: z.boolean(),
            data: z.array(
              z.object({
                idImovel: z.number(),
                titulo: z.string(),
                descricao: z.string(),
                preco: z.number(),
                dimensao: z.string(),
                localizacao: z.string(),
                quartos: z.number(),
                wc: z.number(),
                dataImovel: z.date(),
                tipoImovel: z.string(),
                finalidade: z.string(),
                status: z.string(),
                statusUpload: z.string(),
                arquivos: z.array(
                  z.object({
                    urlfile: z.string().url(),
                    idArquivo: z.number(),
                  }),
                ),
              }),
            ),
          }),
        },
      },
    },
    async (req, res) => controllerImovel.findManyImoveis(req, res),
  );

  app.get(
    "/getByIdImoveis/:idImovel",
    {
      schema: {
        description: "Buscar todas as Imovel existentes",
        tags: ["Imóvel"],
        params: z.object({
          idImovel: z.string().min(1, "Id do Imovel invalido digite um id valido"),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
            data: z.object({
              idImovel: z.number(),
              titulo: z.string(),
              descricao: z.string(),
              preco: z.number(),
              dimensao: z.string(),
              localizacao: z.string(),
              quartos: z.number(),
              wc: z.number(),
              dataImovel: z.date(),
              tipoImovel: z.string(),
              finalidade: z.string(),
              status: z.string(),
              statusUpload: z.string(),
              arquivos: z.array(
                z.object({
                  urlfile: z.string().url(),
                  idArquivo: z.number(),
                }),
              ),
            }),
          }),
        },
      },
    },
    async (req, res) => controllerImovel.findByIdImoveis(req, res),
  );

  app.delete(
    "/deleteImoveis/:idImovel",
    {
      schema: {
        description: "Eliminar uma Imoveis existente",
        tags: ["Imóvel"],

        params: z.object({
          idImovel: z.string().min(1, "Id do Imovel inválido, digite um id válido"),
        }),

        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => controllerImovel.delete(req, res),
  );

  app.put(
    "/UpdateImoveis/:idImovel",
    {
      schema: {
        description: "Atualizar um imóvel",
        tags: ["Imóvel"],

        params: z.object({
          idImovel: z.string().min(1, "ID do imóvel inválido"),
        }),

        body: z.object({
          // Dados do imóvel
          titulo: campoSchema.optional(),
          localizacao: campoSchema.optional(),
          descricao: campoSchema.optional(),
          preco: campoSchema.optional(),
          dimensao: campoSchema.optional(),
          quartos: campoSchema.optional(),
          wc: campoSchema.optional(),

          // Dados enumerados
          tipoImovel: campoSchema.optional(),
          finalidade: campoSchema.optional(),
          estado: campoSchema.optional(),

          // Data do imóvel
          dataImovel: dateSchema.optional(),

          // Eliminar um arquivo ou vários arquivos específicos
          // Exemplo: "[12,15]"
          idArquivo: idArquivoSchema.optional(),

          // Adicionar novas imagens e vídeos
          arquivo: z.any().optional(),
        }),

        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),

            data: z.object({
              idImovel: z.number(),
              titulo: z.string(),
              localizacao: z.string(),
              dataImovel: z.string(),
              descricao: z.string(),
              preco: z.number(),
              dimensao: z.string(),
              quartos: z.number(),
              wc: z.number(),

              tipoImovel: z.string(),
              finalidade: z.string(),
              estado: z.string(),
              statusUpload: z.string(),

              arquivos: z.array(
                z.object({
                  idArquivo: z.number(),
                  filename: z.string(),
                  tipoFile: z.string(),
                  urlfile: z.string(),
                }),
              ),
            }),
          }),
        },
      },
    },

    async (req, res) => controllerImovel.UpdateImovel(req, res),
  );
}
