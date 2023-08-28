import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path"; // Importar o módulo path do Node.js

const entitiesPath = path.join(__dirname, "../entities");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite", // caminho para o arquivo do banco de dados SQLite
  synchronize: true,
  logging: false,
  entities: [`${entitiesPath}/*`],
  migrations: [],
  subscribers: [],
});
