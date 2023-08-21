import { Request, Response } from "express";

const listaDePets = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const novoPet = req.body;

    listaDePets.push(novoPet);
    return res.json(novoPet);
  }
}
