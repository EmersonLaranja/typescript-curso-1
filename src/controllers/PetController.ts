import { Request, Response } from "express";
import type TipoPet from "../types/TipoPet";

const listaDePets: TipoPet[] = [];
//
export default class PetController {
  criaPet(req: Request, res: Response) {
    const { id, adotado, especie, nome, idade } = <TipoPet>req.body;

    if (!id || !adotado || !especie || !nome || !idade) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const novoPet: TipoPet = { id, idade, adotado, especie, nome };
    listaDePets.push(novoPet);
    return res.status(204).json(novoPet);
  }
}
