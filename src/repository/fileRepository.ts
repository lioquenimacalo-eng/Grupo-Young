import { prisma } from "../database/prisma";
import { type ArquivoSchema } from "@model/dao";
import { localArqu, Prisma, TipoArqui, TipoFile } from "generated/prisma/client";

export class arquivo {
  async CreateFile(datas: ArquivoSchema) {
    try {
      const result = await prisma.arquivo.create({
        data: {
          filename: datas.filename,
          urlfile: datas.urlfile,
          dataFile: datas.dataFile,
          local: datas.local,
          tipoArqui: datas.tipoArqui,
          tipoFile: datas.tipoFile,
          imovelId: datas.imovelId,
        },
      });

      return result;
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao criar membro: " + error);
    }
  }

  async deleteFile(id: number) {
    try {
      const result = await prisma.arquivo.delete({
        where: {
          idArquivo: id,
        },
      });

      return result;
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Arquivo não encontrado.");
        }

        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao eliminar arquivo: " + error);
    }
  }

  async getFileById(id: number) {
    try {
      const result = await prisma.arquivo.findUnique({
        where: {
          idArquivo: id,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao buscar arquivo:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao buscar arquivo: " + error);
    }
  }

  async deleteFilesBy(imovelId: number) {
    try {
      const result = await prisma.arquivo.deleteMany({
        where: {
          imovelId: imovelId,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao eliminar arquivos da actividade:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao eliminar arquivos: " + error);
    }
  }

  async updateFile(
    idArquivo: number,
    dados: {
      filename: string;
      urlfile: string;
      dataFile: Date;
      local: localArqu;
      tipoArqui: TipoArqui;
      tipoFile: TipoFile;
      imovelId: number;
    },
  ) {
    try {
      const result = await prisma.arquivo.update({
        where: {
          idArquivo,
        },
        data: dados,
      });

      return result;
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao criar membro: " + error);
    }
  }
}
