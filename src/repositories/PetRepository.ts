import PetEntity from "../entities/PetEntity";
import { Repository } from "typeorm";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
  constructor(private repository: Repository<PetEntity>) {}

  listaPets(): Promise<PetEntity[]> {
    return this.repository.find();
  }
  atualizaPet(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
  deletaPet(id: number): void {
    throw new Error("Method not implemented.");
  }

  criaPet(pet: PetEntity): void {
    this.repository.save(pet);
  }
}
