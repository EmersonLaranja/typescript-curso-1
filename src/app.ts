import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send([
    "Bem vindo ao curso de TypeScript!",
    "aprenda pra que serve o tsconfig",
  ]);
});

router(app);

export default app;
