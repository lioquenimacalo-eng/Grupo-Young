import { CreateTypeImovel, ficheirosSchema, UpdateTypeImovel } from "@model/dao";
import { Imoveis } from "@repository/imovelRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { localArqu, TipoArqui, TipoFile, TipoStatus } from "generated/prisma/enums";
import { deleteFile, fileUpload, getFileUrl, streamToBuffer } from "middleware/fileUpload";
import redis from "middleware/redis";
import { ZodError } from "zod";
import { arquivo } from "@repository/fileRepository";
import type { MultipartFile } from "@fastify/multipart";

export class ImoveisController {
  private Imoveis: Imoveis;
  private arquivos: arquivo;

  constructor() {
    this.Imoveis = new Imoveis();
    this.arquivos = new arquivo();
  }

  async CreateImovel(req: FastifyRequest, res: FastifyReply) {
    try {
      const body = req.body as any;

      // 1. Preparar e validar os dados do imóvel
      const dados = {
        titulo: body.titulo?.value,
        descricao: body.descricao?.value,
        preco: body.preco?.value,
        dimensao: body.dimensao?.value,
        localizacao: body.localizacao?.value,
        quartos: body.quartos?.value,
        wc: body.wc?.value,
        tipoImovel: body.tipoImovel?.value,
        finalidade: body.finalidade?.value,
        estado: body.estado?.value,
      };

      const data = CreateTypeImovel.parse(dados);

      // 2. Validar os ficheiros recebidos
      if (!body.arquivo) {
        return res.status(400).send({
          success: false,
          message: "Seleccione pelo menos um arquivo para o imóvel.",
        });
      }

      const partes: MultipartFile[] = Array.isArray(body.arquivo) ? body.arquivo : [body.arquivo];

      if (partes.length === 0) {
        return res.status(400).send({
          success: false,
          message: "Nenhum arquivo foi recebido.",
        });
      }

      // Validar imagens e vídeos
      const ficheiros = ficheirosSchema.parse(
        partes.map((parte) => ({
          filename: parte.filename,
          mimetype: parte.mimetype,
          file: parte.file,
        })),
      );

      // 3. Criar o imóvel na base de dados
      console.log("A cadastrar o imóvel...");

      const result = await this.Imoveis.createImoveis(data);

      if (!result) {
        throw new Error("Não foi possível cadastrar o imóvel na base de dados.");
      }

      const urls: {
        filename: string;
        tipoFile: TipoFile;
        url: string;
      }[] = [];

      // 4. Fazer upload das imagens e vídeos para o Supabase
      for (let i = 0; i < partes.length; i++) {
        const ficheiro = ficheiros[i];
        const parte = partes[i];

        // Verificar se o ficheiro excedeu o tamanho permitido
        if (parte.file.truncated) {
          return res.status(413).send({
            success: false,
            message: `O ficheiro ${ficheiro.filename} excede o tamanho máximo permitido.`,
          });
        }

        console.log(`A processar ficheiro ${i + 1}/${partes.length}...`);

        // Identificar o tipo de ficheiro
        const tipoFile = ficheiro.mimetype.startsWith("image/") ? TipoFile.Imagem : TipoFile.Video;

        // Definir a pasta de armazenamento
        const pasta = tipoFile === TipoFile.Imagem ? "imagens" : "videos";

        // Converter ficheiro para buffer
        const buffer = await parte.toBuffer();

        if (buffer.length === 0) {
          throw new Error(`O ficheiro ${ficheiro.filename} chegou vazio.`);
        }

        // 5. Upload para o Supabase
        const uploadResult = await fileUpload(
          "Imoveis",
          result.idImovel,
          pasta,
          ficheiro.filename,
          buffer,
          ficheiro.mimetype,
        );

        if (!uploadResult?.path) {
          throw new Error(
            `Não foi possível carregar o ficheiro ${ficheiro.filename} para o Supabase.`,
          );
        }

        // 6. Registar o ficheiro na base de dados
        await this.arquivos.CreateFile({
          filename: ficheiro.filename,
          urlfile: uploadResult.path,
          dataFile: new Date(),
          local: localArqu.IMOVEL,
          tipoArqui: TipoArqui.ADMIN,
          tipoFile,
          imovelId: result.idImovel,
        });

        // 7. Obter URL do ficheiro
        const link = await getFileUrl(uploadResult.path);

        urls.push({
          filename: ficheiro.filename,
          tipoFile,
          url: link,
        });
      }

      // 8. Actualizar o estado do upload
      const dadosActualizados = {
        ...dados,
        idImovel: result.idImovel,
        statusUpload: TipoStatus.CONCLUIDO,
      };

      await this.Imoveis.updateImoveis(dadosActualizados);

      // 9. Consultar o imóvel criado
      const imovel = await this.Imoveis.getImoveisById(result.idImovel);

      if (!imovel) {
        throw new Error("O imóvel foi criado, mas não foi possível carregá-lo.");
      }

      // 10. Preparar a resposta
      const responseData = {
        idImovel: imovel.idImovel,
        titulo: imovel.titulo,
        localizacao: imovel.localizacao,
        dataImovel: imovel.dataImovel,
        descricao: imovel.descricao,
        preco: imovel.preco,
        dimensao: imovel.dimensao,
        quartos: imovel.quartos,
        wc: imovel.wc,
        tipoImovel: imovel.tipoImovel,
        finalidade: imovel.finalidade,
        statusUpload: imovel.statusUpload,
        fileUrls: urls,
      };

      // 11. Guardar na cache Redis
      try {
        await redis.set(`imoveis:${result.idImovel}`, JSON.stringify(responseData), "EX", 3600);

        console.log("Imóvel criado no cache Redis.");
      } catch (redisError) {
        console.error("Erro ao cadastrar o imóvel no cache Redis:", redisError);
      }

      console.log("Imóvel criado com sucesso:", responseData);

      // 12. Responder ao frontend
      return res.status(201).send({
        success: true,
        message: "Imóvel criado com sucesso.",
        data: responseData,
      });
    } catch (error) {
      console.error("Erro no método CreateImovel:", error);

      if (error instanceof ZodError) {
        return res.status(422).send({
          success: false,
          message: "Erro de validação.",
          errors: error.flatten(),
        });
      }

      return res.status(500).send({
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const id = Number((req.params as any).idImovel);

      const result = await this.Imoveis.getImoveisById(id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "Imoveis não encontrada.",
        });
      }

      // Eliminar os arquivos do Supabase
      await Promise.all(
        result.arquivos.map(async (arquivo) => {
          await deleteFile(arquivo.urlfile);
        }),
      );

      // Eliminar a Imoveis e os registros dos arquivos no banco
      const result1 = await this.Imoveis.deleteImoveis(id);

      if (!result1) {
        return res.status(404).send({
          success: false,
          message: "Imoveis não encontrada.",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Imoveis eliminada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao eliminar Imoveis:", error);

      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }

  async findManyImoveis(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await this.Imoveis.getManyImoveis();
      let resultado;

      if (result) {
        resultado = await Promise.all(
          result.map(async (data) => {
            const arquivos = await Promise.all(
              data.arquivos.map(async (arquivo) => {
                const link = await getFileUrl(arquivo.urlfile);

                return {
                  ...arquivo,
                  urlfile: link,
                };
              }),
            );

            return {
              ...data,
              arquivos,
            };
          }),
        );
      }

      return res.status(200).send({
        success: true,
        data: resultado,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }

  async findByIdImoveis(req: FastifyRequest, res: FastifyReply) {
    try {
      const id = Number((req.params as any).idImovel);

      const result = await this.Imoveis.getImoveisById(id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "Imovel não encontrado.",
        });
      }

      const arquivos = await Promise.all(
        result.arquivos.map(async (arquivo) => {
          const link = await getFileUrl(arquivo.urlfile);

          return {
            ...arquivo,
            urlfile: link,
          };
        }),
      );

      const resultado = {
        ...result,
        arquivos,
      };

      console.log({
        success: true,
        data: resultado,
      });

      return res.status(200).send({
        success: true,
        data: resultado,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).send({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }

  async UpdateImovel(req: FastifyRequest, res: FastifyReply) {
    try {
      const body = req.body as any;

      // =====================================================
      // 1. VALIDAR ID DO IMÓVEL
      // =====================================================

      const id = Number((req.params as any).idImovel);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({
          success: false,
          message: "ID do imóvel inválido.",
        });
      }

      // =====================================================
      // 2. VERIFICAR SE O IMÓVEL EXISTE
      // =====================================================

      const imovelExistente = await this.Imoveis.getImoveisById(id);

      if (!imovelExistente) {
        return res.status(404).send({
          success: false,
          message: "Imóvel não encontrado.",
        });
      }

      // =====================================================
      // 3. TRATAR IDs DOS ARQUIVOS A ATUALIZAR
      // =====================================================

      let rawIdArquivo = body.idArquivo?.value ?? body.idArquivo;

      if (typeof rawIdArquivo === "string") {
        try {
          rawIdArquivo = JSON.parse(rawIdArquivo);
        } catch {
          // Mantém o valor original
        }
      }

      const idsArquivos: number[] =
        rawIdArquivo === undefined || rawIdArquivo === null || rawIdArquivo === ""
          ? []
          : (Array.isArray(rawIdArquivo) ? rawIdArquivo : [rawIdArquivo]).map((valor: unknown) => {
              if (
                (typeof valor !== "number" && typeof valor !== "string") ||
                String(valor).trim() === ""
              ) {
                return NaN;
              }

              return Number(valor);
            });

      if (idsArquivos.some((arquivoId) => !Number.isInteger(arquivoId) || arquivoId <= 0)) {
        return res.status(400).send({
          success: false,
          message: "ID do arquivo inválido.",
        });
      }

      // Evitar IDs duplicados
      const idsUnicos = [...new Set(idsArquivos)];

      // =====================================================
      // 4. VALIDAR ARQUIVOS QUE SERÃO SUBSTITUÍDOS
      // =====================================================

      const arquivosParaAtualizar: any[] = [];

      for (const idArq of idsUnicos) {
        const arquivo = await this.arquivos.getFileById(idArq);

        if (!arquivo) {
          return res.status(404).send({
            success: false,
            message: `Arquivo com ID ${idArq} não encontrado.`,
          });
        }

        // Garantir que pertence ao imóvel
        if (arquivo.imovelId !== id) {
          return res.status(403).send({
            success: false,
            message: `O arquivo ${idArq} não pertence a este imóvel.`,
          });
        }

        arquivosParaAtualizar.push(arquivo);
      }

      // =====================================================
      // 5. PREPARAR DADOS DO IMÓVEL
      // =====================================================

      const dados: any = {
        idImovel: id,

        titulo: body.titulo?.value,
        descricao: body.descricao?.value,
        preco: body.preco?.value,
        dimensao: body.dimensao?.value,
        localizacao: body.localizacao?.value,
        quartos: body.quartos?.value,
        wc: body.wc?.value,

        tipoImovel: body.tipoImovel?.value,
        finalidade: body.finalidade?.value,
        estado: body.estado?.value,

        dataImovel: body.dataImovel?.value
          ? new Date(body.dataImovel.value)
          : imovelExistente.dataImovel,
      };

      // Remover campos não enviados
      Object.keys(dados).forEach((key) => {
        if (dados[key] === undefined) {
          delete dados[key];
        }
      });

      // Validar dados
      const data = UpdateTypeImovel.parse(dados);

      // =====================================================
      // 6. RECEBER E PROCESSAR NOVOS ARQUIVOS
      // =====================================================

      const possuiArquivos = body.arquivo !== undefined && body.arquivo !== null;

      if (possuiArquivos) {
        const partes: MultipartFile[] = Array.isArray(body.arquivo) ? body.arquivo : [body.arquivo];

        if (partes.length === 0) {
          return res.status(400).send({
            success: false,
            message: "Nenhum arquivo foi recebido.",
          });
        }

        // Verificar se todos os arquivos selecionados para
        // substituição possuem um novo arquivo correspondente.
        if (arquivosParaAtualizar.length > partes.length) {
          return res.status(400).send({
            success: false,
            message:
              "A quantidade de arquivos selecionados para substituição não corresponde aos novos arquivos enviados.",
          });
        }

        // Validar imagens e vídeos
        const ficheiros = ficheirosSchema.parse(
          partes.map((parte) => ({
            filename: parte.filename,
            mimetype: parte.mimetype,
            file: parte.file,
          })),
        );

        // Atualizar estado do upload
        await this.Imoveis.updateImoveis({
          idImovel: id,
          statusUpload: TipoStatus.PROCESSANDO,
        });

        // =====================================================
        // GUARDAR DADOS PARA EVENTUAL ROLLBACK
        // =====================================================

        const operacoesArquivos: {
          path: string;
          idArquivo: number;
          arquivoAntigo?: any;
        }[] = [];

        try {
          // =================================================
          // 7. PROCESSAR IMAGENS E VÍDEOS
          // =================================================

          for (let i = 0; i < partes.length; i++) {
            const ficheiro = ficheiros[i];
            const parte = partes[i];

            // Verificar limite de tamanho
            if (parte.file.truncated) {
              throw new Error(`O ficheiro ${ficheiro.filename} excede o tamanho máximo permitido.`);
            }

            // Identificar tipo de arquivo
            const tipoFile = ficheiro.mimetype.startsWith("image/")
              ? TipoFile.Imagem
              : TipoFile.Video;

            // Definir pasta de armazenamento
            const pasta = tipoFile === TipoFile.Imagem ? "imagens" : "videos";

            // Converter para Buffer
            const buffer = await parte.toBuffer();

            if (buffer.length === 0) {
              throw new Error(`O ficheiro ${ficheiro.filename} chegou vazio.`);
            }

            // =================================================
            // 8. UPLOAD PARA SUPABASE
            // =================================================

            const uploadResult = await fileUpload(
              "Imoveis",
              id,
              pasta,
              ficheiro.filename,
              buffer,
              ficheiro.mimetype,
            );

            if (!uploadResult?.path) {
              throw new Error(`Não foi possível carregar ${ficheiro.filename} para o Supabase.`);
            }

            // Verificar se existe um arquivo para substituir
            const arquivoAntigo = arquivosParaAtualizar[i];

            let arquivoResultado;

            if (arquivoAntigo) {
              // =============================================
              // 9. ATUALIZAR REGISTO EXISTENTE NO BANCO
              // =============================================

              // Guardar os dados antigos para rollback
              const dadosAntigos = {
                filename: arquivoAntigo.filename,
                urlfile: arquivoAntigo.urlfile,
                dataFile: arquivoAntigo.dataFile,
                local: arquivoAntigo.local,
                tipoArqui: arquivoAntigo.tipoArqui,
                tipoFile: arquivoAntigo.tipoFile,
                imovelId: arquivoAntigo.imovelId,
              };

              try {
                // Atualizar o mesmo registo no Prisma
                arquivoResultado = await this.arquivos.updateFile(arquivoAntigo.idArquivo, {
                  filename: ficheiro.filename,
                  urlfile: uploadResult.path,
                  dataFile: new Date(),
                  local: localArqu.IMOVEL,
                  tipoArqui: TipoArqui.ADMIN,
                  tipoFile,
                  imovelId: id,
                });

                // Guardar operação para eventual rollback
                operacoesArquivos.push({
                  path: uploadResult.path,
                  idArquivo: arquivoAntigo.idArquivo,
                  arquivoAntigo: dadosAntigos,
                });
              } catch (updateError) {
                // Se a atualização no banco falhar,
                // eliminar apenas o novo arquivo do Supabase.
                await deleteFile(uploadResult.path);
                throw updateError;
              }
            } else {
              // =============================================
              // 10. CRIAR NOVO REGISTO
              // =============================================

              arquivoResultado = await this.arquivos.CreateFile({
                filename: ficheiro.filename,
                urlfile: uploadResult.path,
                dataFile: new Date(),
                local: localArqu.IMOVEL,
                tipoArqui: TipoArqui.ADMIN,
                tipoFile,
                imovelId: id,
              });

              // Guardar para eventual rollback
              operacoesArquivos.push({
                path: uploadResult.path,
                idArquivo: arquivoResultado.idArquivo,
              });
            }
          }

          // =================================================
          // 11. ATUALIZAR DADOS DO IMÓVEL
          // =================================================

          const result = await this.Imoveis.updateImoveis(data);

          if (!result) {
            throw new Error("Não foi possível atualizar os dados do imóvel.");
          }

          // =================================================
          // 12. UPLOAD CONCLUÍDO
          // =================================================

          await this.Imoveis.updateImoveis({
            idImovel: id,
            statusUpload: TipoStatus.CONCLUIDO,
          });

          // =================================================
          // 13. ELIMINAR ANTIGOS ARQUIVOS DO SUPABASE
          // =================================================

          // Neste ponto os novos arquivos já foram carregados
          // e os registos do banco já foram atualizados.
          // Os arquivos antigos só são eliminados do Storage.

          for (const operacao of operacoesArquivos) {
            if (operacao.arquivoAntigo) {
              try {
                await deleteFile(operacao.arquivoAntigo.urlfile);
              } catch (deleteError) {
                console.error(
                  "Erro ao eliminar arquivo antigo do Supabase:",
                  operacao.arquivoAntigo.urlfile,
                  deleteError,
                );
              }
            }
          }
        } catch (uploadError) {
          // =================================================
          // 14. ROLLBACK DOS ARQUIVOS
          // =================================================

          for (const operacao of [...operacoesArquivos].reverse()) {
            try {
              if (operacao.arquivoAntigo) {
                // Restaurar registo antigo no banco
                await this.arquivos.updateFile(operacao.idArquivo, operacao.arquivoAntigo);
              } else {
                // Arquivo novo: eliminar registo criado
                await this.arquivos.deleteFile(operacao.idArquivo);
              }

              // Eliminar novo arquivo do Supabase
              await deleteFile(operacao.path);
            } catch (rollbackError) {
              console.error("Erro ao reverter arquivo:", operacao.idArquivo, rollbackError);
            }
          }

          // Atualizar estado para erro
          await this.Imoveis.updateImoveis({
            idImovel: id,
            statusUpload: TipoStatus.ERRO,
          });

          throw uploadError;
        }
      } else {
        // =====================================================
        // 15. ATUALIZAR APENAS OS DADOS DO IMÓVEL
        // =====================================================

        const result = await this.Imoveis.updateImoveis(data);

        if (!result) {
          return res.status(404).send({
            success: false,
            message: "Não foi possível atualizar o imóvel.",
          });
        }
      }

      // =====================================================
      // 16. BUSCAR IMÓVEL ATUALIZADO
      // =====================================================

      const imovel = await this.Imoveis.getImoveisById(id);

      if (!imovel) {
        throw new Error("Imóvel atualizado, mas não foi possível carregá-lo.");
      }

      // =====================================================
      // 17. GERAR URLS DOS ARQUIVOS
      // =====================================================

      const arquivos = await Promise.all(
        imovel.arquivos.map(async (arquivo) => {
          const link = await getFileUrl(arquivo.urlfile);

          return {
            idArquivo: arquivo.idArquivo,
            filename: arquivo.filename,
            tipoFile: arquivo.tipoFile,
            urlfile: link,
          };
        }),
      );

      // =====================================================
      // 18. PREPARAR RESPONSE
      // =====================================================

      const responseData = {
        idImovel: imovel.idImovel,
        titulo: imovel.titulo,
        localizacao: imovel.localizacao,

        dataImovel:
          imovel.dataImovel instanceof Date
            ? imovel.dataImovel.toISOString()
            : String(imovel.dataImovel),

        descricao: imovel.descricao,
        preco: imovel.preco,
        dimensao: imovel.dimensao,
        quartos: imovel.quartos,
        wc: imovel.wc,

        tipoImovel: imovel.tipoImovel,
        finalidade: imovel.finalidade,
        estado: imovel.status,
        statusUpload: imovel.statusUpload,

        arquivos,
      };

      // =====================================================
      // 19. ATUALIZAR REDIS
      // =====================================================

      try {
        await redis.set(`imoveis:${id}`, JSON.stringify(responseData), "EX", 3600);

        console.log("Cache Redis atualizado.");
      } catch (redisError) {
        console.error("Erro ao atualizar cache Redis:", redisError);
      }

      // =====================================================
      // 20. RESPOSTA
      // =====================================================

      console.log("Resposta do imóvel atualizado:", responseData);

      return res.status(200).send({
        success: true,
        message: "Imóvel atualizado com sucesso.",
        data: responseData,
      });
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);

      if (error instanceof ZodError) {
        return res.status(422).send({
          success: false,
          message: "Erro de validação.",
          errors: error.flatten(),
        });
      }

      return res.status(500).send({
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
