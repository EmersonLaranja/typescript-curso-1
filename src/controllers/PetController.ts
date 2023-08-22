import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../types/EnumEspecie";

const listaDePets: TipoPet[] = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const { id, adotado, especie, nome, idade } = <TipoPet>req.body;

    if (!id || !adotado || !especie || !nome || !idade) {
      return res
        .status(400)
        .json({ erro: "Todos os campos são obrigatórios." });
    }

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erro: "Espécie inválida." });
    }

    const novoPet: TipoPet = { id: Number(id), idade, adotado, especie, nome };
    listaDePets.push(novoPet);
    return res.status(204).json(novoPet);
  }

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  buscaPetPorId(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado." });
    }
    return res.status(200).json(pet);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, idade, especie, adotado } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado." });
    }
    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado." });
    }
    const indice = listaDePets.indexOf(pet);
    listaDePets.splice(indice, 1);
    return res.status(204).json();
  }
}
