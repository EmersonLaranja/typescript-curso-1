/* eslint-disable semi */
import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): Promise<void> | void;

  listaPets(): PetEntity[] | Promise<PetEntity[]>;

  atualizaPet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }> | void;

  deletaPet(id: number): Promise<{ success: boolean; message?: string }> | void;

  adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<{ success: boolean; message?: string }> | void;

  buscaPetPorFaixaDeIdade(
    idadeInicial: number,
    idadeFinal: number
  ): PetEntity[] | Promise<PetEntity[]>;

  buscaPetPeloPorte(porte: string): PetEntity[] | Promise<PetEntity[]>;
  buscaPetPorFaixaDeIdade(
    minIdade: number,
    maxIdade: number
  ): Promise<PetEntity[]>;
}
