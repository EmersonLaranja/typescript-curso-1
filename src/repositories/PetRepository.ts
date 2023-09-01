import PetEntity from "../entities/PetEntity";
import { Repository } from "typeorm";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import { Between } from "typeorm";
import EnumPorte from "../types/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
  constructor(
    private petRepository: Repository<PetEntity>,
    private adotanteRepository: Repository<AdotanteEntity>
  ) {}
  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }

  async listaPets(): Promise<PetEntity[]> {
    return await this.petRepository.find({ relations: ["adotante"] });
  }
  async atualizaPet(
    id: number,
    newData: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.petRepository.findOne({ where: { id } });

      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);

      await this.petRepository.save(petToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      };
    }
  }

  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToRemove = await this.petRepository.findOne({ where: { id } });

      if (!petToRemove) {
        return { success: false, message: "Pet não encontrado" };
      }

      await this.petRepository.remove(petToRemove);

      return { success: true };
    } catch (error) {
      // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o pet.",
      };
    }
  }

  async adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petProcurado = await this.petRepository.findOne({
        where: { id: idPet },
      });
      if (!petProcurado) {
        return { success: false, message: "Pet não encontrado" };
      }

      const adotanteProcurado = await this.adotanteRepository.findOne({
        where: { id: idAdotante },
      });
      if (!adotanteProcurado) {
        return { success: false, message: "Adotante não encontrado" };
      }

      petProcurado.adotante = adotanteProcurado;
      petProcurado.adotado = true;
      await this.petRepository.save(petProcurado);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar adotar o pet.",
      };
    }
  }

  async buscaPetPeloPorte(porte: EnumPorte) {
    return await this.petRepository.find({ where: { porte } });
  }

  async buscaPetPorFaixaDeIdade(
    minIdade: number,
    maxIdade: number
  ): Promise<PetEntity[]> {
    const dataAtual = new Date();
    const minData = new Date(dataAtual);
    const maxData = new Date(dataAtual);

    minData.setFullYear(minData.getFullYear() - maxIdade);
    console.log(minIdade, maxIdade);

    maxData.setFullYear(maxData.getFullYear() - minIdade);
    console.log(minData.getFullYear(), maxData.getFullYear());
    return await this.petRepository.find({
      where: {
        dataDeNascimento: Between(minData, maxData),
      },
    });
  }
}
