import { FastifyReply, FastifyRequest } from "fastify";
import { Leads } from "@repository/leadsRepository";
import { CreateTypeInteresse, UpdateTypeInteresse } from "@model/dao";


export class leadsController {
  private Lead: Leads;

  constructor() {
    this.Lead = new Leads();
  }

  async createLeads(req: FastifyRequest, res: FastifyReply) {
    const data = CreateTypeInteresse.parse(req.body);

    try {
      const result = await this.Lead.createLeads(data);

      if (!result) {
        return res.status(200).send("Failure to create Leads if exists!");
      }

      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal error server!");
    }
  }

  async updateLeads(req: FastifyRequest, res: FastifyReply) {
    const data = UpdateTypeInteresse.parse(req.body);

    try {
      const result = await this.Lead.updateLeads(data);

      if (result === null) {
        return res.status(400).send("Failure to update Lead if not exists!");
      }

      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!" + error);
    }
  }

  async deleteLead(req: FastifyRequest, res: FastifyReply) {
    const id = Number((req.body as any).idLead);

    try {
      const result = await this.Lead.deleteLeads(Number(id));

      if (result === null) {
        return res.status(400).send("Failure to delete Lead not found!");
      }

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!" + error);
    }
  }

  async getLeadById(req: FastifyRequest, res: FastifyReply) {
    const id = Number((req.params as any).idLead);

    try {
      const result = await this.Lead.findByIdLeads(Number(id));

      if (result === null) {
        return res.status(400).send("Failure to get Lead by id !");
      }

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!");
    }
  }

  async getLeadMany(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await this.Lead.findManyLeads();

      if (result === null) {
        return res.status(400).send("Failure to get paroquia !");
      }

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Internal error server!");
    }
  }

}
