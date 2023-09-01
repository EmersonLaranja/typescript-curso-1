import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import PetRepository from "../repositories/PetRepository";
import EnumEspecie from "../types/EnumEspecie";
import EnumPorte from "../types/EnumPorte";
export default class PetController {
  constructor(private repository: PetRepository) {}

  async criaPet(req: Request, res: Response) {
    const { adotado, especie, nome, dataDeNascimento, porte } = <PetEntity>(
      req.body
    );

    if (
      adotado == undefined ||
      especie == undefined ||
      nome == undefined ||
      dataDeNascimento == undefined ||
      porte == undefined
    ) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erro: "Espécie inválida." });
    }

    if (!(porte in EnumPorte)) {
      return res.status(400).json({ erro: "Porte inválido." });
    }

    const novoPet = new PetEntity(
      nome,
      dataDeNascimento,
      especie,
      adotado,
      porte
    );
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

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.params;
    const listaDePets: PetEntity[] = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );
    return res.json(listaDePets);
  }

  async buscaPetPorFaixaDeIdade(req: Request, res: Response) {
    const { idadeInicial, idadeFinal } = req.params;
    const listaDePets: PetEntity[] =
      await this.repository.buscaPetPorFaixaDeIdade(
        Number(idadeInicial),
        Number(idadeFinal)
      );
    return res.json(listaDePets);
  }

  async buscarPetPorCampo(req: Request, res: Response) {
    const { campo, valor } = req.params;

    try {
      const petEncontrado = await this.repository.buscarPetPorCampo(
        campo as keyof PetEntity,
        valor
      );

      if (petEncontrado) {
        return res.status(200).json(petEncontrado);
      } else {
        return res.status(404).json({ mensagem: "Pet não encontrado" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  }
}
