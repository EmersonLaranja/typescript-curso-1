import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  celular: string;

  @Column({ nullable: true })
  foto?: string; // Usar o operador ? para campo opcional

  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    eager: true,
    cascade: true,
  }) // Relacionamento 1:1 com EnderecoEntity
  @JoinColumn() // Coluna de chave estrangeira
  endereco?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.adotante) // Relacionamento 1:N com PetEntity
  pets!: PetEntity[];

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto?: string, // Usar o operador ? para parâmetro opcional
    endereco?: EnderecoEntity // Usar o operador ? para parâmetro opcional
  ) {
    this.nome = nome;
    this.senha = senha;
    this.celular = celular;
    this.foto = foto;
    this.endereco = endereco;
  }
}
