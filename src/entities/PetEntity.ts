import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../types/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column()
  dataDeNascimento: Date;

  @Column()
  especie: EnumEspecie;

  @Column()
  adotado: boolean;

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;
  constructor(
    nome: string,
    dataDeNascimento: Date,
    especie: EnumEspecie,
    adotado: boolean
  ) {
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
    this.especie = especie;
    this.adotado = adotado;
  }
}
