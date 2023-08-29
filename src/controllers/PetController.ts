import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import PetRepository from "../repositories/PetRepository";
import EnumEspecie from "../types/EnumEspecie";
export default class PetController {
  constructor(private repository: PetRepository) {}

  async criaPet(req: Request, res: Response) {
    const { adotado, especie, nome, dataDeNascimento } = <PetEntity>req.body;

    if (
      adotado == undefined ||
      especie == undefined ||
      nome == undefined ||
      dataDeNascimento == undefined
    ) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erro: "Espécie inválida." });
    }

    const novoPet = new PetEntity(nome, dataDeNascimento, especie, adotado);
    // listaDePets.push(novoPet);
    await this.repository.criaPet(novoPet);
    return res.status(204).json(novoPet);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPets();
    return res.json(listaDePets);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}
