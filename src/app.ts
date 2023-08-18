import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send([
    "Bem vindo ao curso de TypeScript!",
    "aprenda pra que serve o tsconfig",
  ]);
});

export default app;
