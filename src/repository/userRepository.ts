import { prisma } from "../database/prisma";
import { type CreateUser, type LoginUser, type UpdateUser } from "@model/dao";
import { Prisma } from "generated/prisma/client";

export class usersYoung {

  async CreateUser(datas: CreateUser) {
    try {
      const result = await prisma.user.create({
        data: {
          nome: datas.nome,
          email: datas.email,
          contacto: datas.contacto,
          localizacao: datas.localizacao,
          role: datas.role,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao criar corretor:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao criar corretor: " + error);
    }
  }

  async UpdateUser(datas: UpdateUser) {
    try {
      const result = await prisma.user.update({
        where: {
          idUser: datas.idUser,
        },
        data: {
          nome: datas.nome,
          email: datas.email,
          contacto: datas.contacto,
          localizacao: datas.localizacao,
          role: datas.role,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao actualizar corretor:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Erro Prisma: " + error.code);
      }

      throw new Error("Erro ao actualizar corretor: " + error);
    }
  }

  async findByIdUser(id: number) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          idUser: id,
        },
        include: {
          arquivos: {
              select: {
                idArquivo: true,
                urlfile: true,
                filename: true,
                tipoFile: true,
            },
          },
          imoveis: true,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; // usuário não existe
      }

      throw new Error("Error to find by Id corretor!");
    }
  }

  async findManyUsers() {
    try {
      const result = await prisma.user.findMany({
        where: { role: "Corretor" },
        include: {
          arquivos: {
            select: {
              idArquivo: true,
              urlfile: true,
              filename: true,
              tipoFile: true,
            },
          },
          imoveis: true,
        },
      });

      //console.log("chegou aqui",JSON.stringify(result, null, 2));
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; 
      }
      throw new Error("Error to find many users correctores");
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await prisma.user.delete({ where: { idUser: id } });

      return { message: "User deleted successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null; // usuário não existe
      }

      throw new Error("Error to delete user Id " + id);
    }
  }


}
