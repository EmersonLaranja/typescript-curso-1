import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../types/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import TipoPorte from "../types/EnumPorte";
import EnumPorte from "../types/EnumPorte";

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

  @Column()
  porte: EnumPorte;

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;
  constructor(
    nome: string,
    dataDeNascimento: Date,
    especie: EnumEspecie,
    adotado: boolean,
    porte: TipoPorte
  ) {
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
    this.especie = especie;
    this.adotado = adotado;
    this.porte = porte;
  }
}
