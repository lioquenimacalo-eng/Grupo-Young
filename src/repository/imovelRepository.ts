import { CreateImovel, type UpdateImovel } from "@model/dao";
import { prisma } from "database/prisma";
import { Prisma, status, TipoStatus } from "generated/prisma/client";

export class Imoveis {
  async createImoveis(datas: CreateImovel) {
    try {
      const result = await prisma.imoveis.create({
        data: {
          titulo: datas.titulo,
          descricao: datas.descricao,
          localizacao: datas.localizacao,
          dimensao: datas.dimensao,
          statusUpload: datas.statusUpload as TipoStatus,
          dataImovel: datas.dataImovel,
          quartos: datas.quartos,
          status:  datas.estado as status,
          wc: datas.wc,
          tipoImovel: datas.tipoImovel,
          finalidade: datas.finalidade,
          preco: datas.preco,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }

      console.error("Erro ao cadastrar Imóvel!", error)

      throw new Error("Erro ao cadastrar Imóvel!");
    }
  }

  async deleteImoveis(id: number) {
    try {
      const result = await prisma.imoveis.delete({
        where: {
          idImovel: id,
        },
      });

      return { message: "Imoveis deleted successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }

      throw new Error("Error to delete Imoveis");
    }
  }

  async getImoveisById(id: number) {
    try {
      const result = await prisma.imoveis.findUnique({
        where: {
          idImovel: id,
        },
        include: {
          arquivos: {
            select: {
              idArquivo: true,
              urlfile: true,
              filename : true,
              tipoFile : true
            },
          },
        },
      });

      return result;
    } catch (error) {
      console.error("Erro original ao buscar Imoveis por ID:", error);

      throw error;
    }
  }

  async getManyImoveis() {
    try {
      const result = await prisma.imoveis.findMany({
        include: {
          arquivos: {
            select: {
              urlfile: true,
              idArquivo: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }

      throw new Error("Error to get Many Imoveiss");
    }
  }

  async updateImoveis(data: UpdateImovel) {
    const { idImovel, titulo, dataImovel, estado, ...rest } = data;

    try {
      const result = await prisma.imoveis.updateMany({
        where: { idImovel },
        data: {
          ...rest,
          titulo: titulo,
          dataImovel: dataImovel,
          status: estado
        },
      });

      if (result.count === 0) {
        return null;
      }

      return result;
    } catch (error) {
      console.error("Erro ao atualizar Imoveis:", error);
      throw error;
    }
  }
}
