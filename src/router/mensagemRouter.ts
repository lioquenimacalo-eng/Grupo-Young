import { FastifyInstance } from "fastify";
import { mensagemController } from "@controller/mensagemController";
import z from "zod";


export async function centrosRouter(app: FastifyInstance) {
  const controllMensagem = new mensagemController();


  // Atualizar Mensagem
  app.put(
    "/updateMensagem",
    {
      // preHandler: verifyJWT,
      schema: {
        description: "Atualizar um centro existente",
        tags: ["Mensagem"],
        body: z.object({
          idMensagem: z.number().min(1, "Id da mensagem é necessário"),
        }),
        response: {
          200: {message : ""}
        },
      },
    },
    async (req, res) => controllMensagem.updateMensagem(req, res),
  );

  // Buscar mensagem por ID
  app.get(
    "/findByID/:idMensagem",
    {
      // preHandler: verifyJWT,
      schema: {
        description: "Buscar mensagem por Id",
        tags: ["Mensagem"],
        params: z.object({
          idCentrosParoquias: z.string().min(1, "Id mensagem invalido digite um id valido"),
        }),
        response: {
          200: z.object({
            idCentrosParoquias: z.number(),
            nomeCentro: z.string(),
            coordenador: z.string().optional(),
            paroquia: z.number().optional(),
          }),
        },
      },
    },
    async (req, res) => controllMensagem.getMensagemById(req, res),
  );

  // Buscar todas as mensagem
  app.get(
    "/findMany",
    {
      // preHandler: verifyJWT,
      schema: {
        description: "Listar todas as mensagens",
        tags: ["Mensagem"],
        response: {
          200: z.array(
            z.object({
              idCentrosParoquias: z.number(),
              nomeCentro: z.string(),
              coordenador: z.string(),
              paroquia: z.object({
                idParoquia: z.number(),
                nomeParoquia: z.string(),
                quota: z.number()
              }),
            }),
          ),
        },
      },
    },
    async (req, res) => controllMensagem.getMensagemMany(req, res),
  );

  // Deletar centro
  app.delete(
    "/deleteCentros",
    {
      // preHandler: verifyJWT,
      schema: {
        description: "Deletar mensagem por Id",
        tags: ["Mensagem"],
        body: z.object({ idMensagem: z.coerce.number().min(1, "Mensagem Id invalido") }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => controllMensagem.deleteMensagem(req, res),
  );
  
}
