import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../types/EnumEspecie";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataDeNascimento: Date;

  @Column()
  especie: EnumEspecie;

  @Column()
  adotado: boolean;

  constructor(
    id: number,
    nome: string,
    dataDeNascimento: Date,
    especie: EnumEspecie,
    adotado: boolean
  ) {
    this.id = id;
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
    this.especie = especie;
    this.adotado = adotado;
  }
}
