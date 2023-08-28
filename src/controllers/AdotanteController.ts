import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import PetRepository from "../repositories/PetRepository";
import EnumEspecie from "../types/EnumEspecie";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
export default class PetController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    const { celular, endereco, foto, nome, senha } = <AdotanteEntity>req.body;

    if (!celular || !nome || !senha) {
      return res
        .status(400)
        .json({ erro: "Nome, celular e senha são obrigatórios." });
    }

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res.status(204).json(novoAdotante);
  }

  // async atualizaPet(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { success, message } = await this.repository.atualizaPet(
  //     Number(id),
  //     req.body as PetEntity
  //   );

  //   if (!success) {
  //     return res.status(404).json({ message });
  //   }
  //   return res.sendStatus(204);
  // }

  // async listaPets(req: Request, res: Response) {
  //   const listaDePets = await this.repository.listaPets();
  //   return res.json(listaDePets);
  // }

  // async deletaPet(req: Request, res: Response) {
  //   const { id } = req.params;

  //   const { success, message } = await this.repository.deletaPet(Number(id));

  //   if (!success) {
  //     return res.status(404).json({ message });
  //   }
  //   return res.sendStatus(204);
  // }
}
