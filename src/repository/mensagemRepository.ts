import type { CreateMensagem, UpdateMensagem } from "@model/dao";
import { prisma } from "../database/prisma";
import { Prisma } from "generated/prisma/client";

export class Mensagem {

  async CreateMensages(datas: CreateMensagem) {
    try {
      const result = await prisma.mensagem.create({
        data: {
          texto: datas.texto,
          dataMensagem: datas.dataMensagem,
          estado: datas.estado,
          userId: datas.userId,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao cadastrar Mensagem:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao cadastrar Mensagem: " + error);
    }
  }

  async UpdateMensages(datas: UpdateMensagem) {
    try {
      const result = await prisma.mensagem.update({
        where: { idMensagem: datas.idMensagem },
        data: { estado: datas.estado },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; 
      }

      throw new Error("Error to update mensagem !" + error);
    }
  }

  async findByIdMensages(id: number) {
    try {
      const result = await prisma.mensagem.findUnique({
        where: {
          idMensagem: id,
        },
        include: {
          user: {
            select: {
                nome: true,
                email: true,
                contacto: true
            }
          }
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; // usuário não existe
      }

      throw new Error("Error to find by Id user!");
    }
  }

  async findManyMensages() {
    try {
        const result = await prisma.mensagem.findMany({
            include: {
            user: {
              select: {
                nome: true,
                email: true,
                contacto: true,
              },
            },
          },
        });
    
        return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw new Error("Error to find many users");
    }
  }

  async deleteMensages(id: number) {
    try {
      const result = await prisma.mensagem.delete({ where: { idMensagem: id } });

      return { message: "Mensagem deleted successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; // usuário não existe
      }

      throw new Error("Error to delete mensagem Id " + id);
    }
  }

}
