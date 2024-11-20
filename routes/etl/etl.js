import { Router } from "express";
import { EtlController } from "../../controllers/etl/etl.js";

export const creatEtlRouter = () => {
  const etlRouter = Router();
  const etlController = new EtlController();
  etlRouter.post("/", etlController.create);
  return etlRouter;
};
