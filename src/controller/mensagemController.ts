import { FastifyReply, FastifyRequest } from "fastify";
import {  UpdateTypeMensagem } from "@model/dao";
import { Mensagem} from "@repository/mensagemRepository";

export class mensagemController {
  private Mensagens: Mensagem;

  constructor() {
    this.Mensagens = new Mensagem();
  }

  async updateMensagem(req: FastifyRequest, res: FastifyReply) {
    
        const data = UpdateTypeMensagem.parse(req.body);

    try {
      const result = await this.Mensagens.UpdateMensages(data);

      if (result === null) {
        return res.status(400).send("Failure to update mensagen if not exists!");
      }

      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!" + error);
    }
  }

  async deleteMensagem(req: FastifyRequest, res: FastifyReply) {
    const id = Number((req.body as any).idMensagem);

    try {
      const result = await this.Mensagens.deleteMensages(id);

      if (!result) {
        return res.status(404).send({
          success: false,
          message: "Centro não encontrado",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Mensagem eliminada com sucesso",
      });
    } catch (error: any) {
     
      return res.status(500).send({
        success: false,
        message: "Erro interno no servidor",
      });
    }
  }

  async getMensagemById(req: FastifyRequest, res: FastifyReply) {
    const id = Number((req.params as any).idMensagem);

    try {
      const result = await this.Mensagens.findByIdMensages(Number(id));

      if (result === null) {
        return res.status(400).send("Failure to get mensagem by id !");
      }

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!");
    }
  }

  async getMensagemMany(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await this.Mensagens.findManyMensages();

      if (result === null) {
        return res.status(400).send("Failure to get mensagem !");
      }

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!");
    }
  }
}
