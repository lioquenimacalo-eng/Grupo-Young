import type { CreateInteresse, UpdateInteresse } from "@model/dao";
import { prisma } from "database/prisma";
import { Prisma } from "generated/prisma/client";


export class Leads {

  async createLeads(datas: CreateInteresse ) {
    try {
      const result = await prisma.interesse.create({
        data: {
          imovelId: datas.imovelId,
          leadId: datas.leadId,
          observacoes : datas.observacoes,
          dataInteresse: datas.dataInteresse
        },
      });

       return result;
    } catch (error) {
      throw new Error("Error to create Paroquia!");
    }
  }

  async updateLeads(datas: UpdateInteresse) {
    try {
      
      const result = await prisma.interesse.update({
        where: {
          idInteresse: datas.idInteresse,
        },
        data: {
          observacoes: datas.observacoes,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw new Error("Error to update paróquia");
    }
  }

  async findByIdLeads(id: number) {
    try {
      const result = await prisma.interesse.findUnique({ where: { idInteresse: id } });

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }

      throw new Error("Error to find by id Leads.");
    }
  }

  async findManyLeads() {
    try {
      const result = await prisma.interesse.findMany({
        include: {
                imovel: {
                    select:{
                        titulo: true,
                        preco: true,
                        arquivos: true,
                    }
                },
               lead: {
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
        return null;
      }

      throw new Error("Error to find many Leads");
    }
  }

  async deleteLeads(id: number) {
    try {
      const result = await prisma.interesse.delete({ where: { idInteresse: id } });
      return { message: "Leads deleted successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }

      throw new Error("Error to delete Leads whith id " + id);
    }
  }

}
