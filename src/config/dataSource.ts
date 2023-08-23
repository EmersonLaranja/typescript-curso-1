import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite", // caminho para o arquivo do banco de dados SQLite
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});
