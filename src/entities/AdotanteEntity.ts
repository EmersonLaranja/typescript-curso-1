import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ nullable: true })
  endereco?: string; // Usar o operador ? para campo opcional

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto?: string, // Usar o operador ? para parâmetro opcional
    endereco?: string // Usar o operador ? para parâmetro opcional
  ) {
    this.nome = nome;
    this.senha = senha;
    this.celular = celular;
    this.foto = foto;
    this.endereco = endereco;
  }
}
