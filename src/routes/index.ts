import express from "express";
import petRouter from "./petRoutes";
import adotanteRouter from "./adotanteRoutes";

const router = (app: express.Router) => {
  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter);
};

export default router;
