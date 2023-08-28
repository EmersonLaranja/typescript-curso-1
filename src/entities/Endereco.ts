import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Endereco {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  constructor(cidade: string, estado: string) {
    this.cidade = cidade;
    this.estado = estado;
  }
}
