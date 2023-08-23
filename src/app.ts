import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send([
    "Bem vindo ao curso de TypeScript!",
    "aprenda pra que serve o tsconfig",
  ]);
});

router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("DataSouce inicializado com sucesso!");
  })
  .catch((error: Error) => console.log(error));

export default app;
