import { FastifyInstance } from "fastify";
import { leadsController } from "@controller/leadsController";
import { z } from "zod";

export async function leadesRouter(app: FastifyInstance) {
  const controllerLeads = new leadsController();

  // Atualizar paróquia
  app.put(
    "/updateLead",
    {
      //preHandler: verifyJWT,
      schema: {
        description: "Atualizar um Lead existente",
        tags: ["Leads"],
        body: z.object({
          idParoquia: z.number().min(1, "O id da paróquia é necessário"),
          nomeParoquia: z.string().min(1, "O nome para ser actualizado é necessário").optional(),
          quota: z.coerce.number().min(1, "Valor da quota invalido").optional(),
        }),
        response: {
          200: z.object({
            idParoquia: z.number(),
            nomeParoquia: z.string(),
            quota: z.number(),
          }),
        },
      },
    },
    async (req, res) => controllerLeads.updateLeads(req, res),
  );

  // Buscar Leads por ID
  app.get(
    "/findByID/:idLeads",
    {
      //preHandler: verifyJWT,
      schema: {
        description: "Buscar Leads por Id",
        tags: ["Leads"],
        params: z.object({
          idParoquia: z.string().min(1, "Id centro invalido digite um id valido"),
        }),
        response: {
          201: z.object({
            nomeParoquia: z.string(),
            coordenador: z.string(),
            quota: z.string(),
            qtdCentros: z.coerce.number(),
          }),
        },
      },
    },
    async (req, res) => controllerLeads.getLeadById(req, res),
  );

  // Buscar todos os Leads
  app.get(
    "/findMany",
    {
      //preHandler: verifyJWT,
      schema: {
        description: "Listar todos os Leads",
        tags: ["Leads"],
        response: {
          201: z.object({
            nomeParoquia: z.string(),
            coordenador: z.string(),
            quota: z.string(),
            qtdCentros: z.coerce.number(),
          }),
        },
      },
    },
    async (req, res) => controllerLeads.getLeadMany(req, res),
  );

  // Deletar Leads
  app.delete(
    "/deleteLeads",
    {
      //preHandler: verifyJWT,
      schema: {
        description: "Deletar Leads por Id",
        tags: ["Leads"],
        body: z.object({ idParoquia: z.coerce.number().min(1, "Paroquia Id invalido") }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => controllerLeads.deleteLead(req, res),
  );

}
