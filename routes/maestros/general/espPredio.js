import { Router } from "express";
import { EspPredioController } from "../../../controllers/maestros/general/espPredio.js";

export const createEspPredioRouter = () => {
  const router = Router();

  const dataController = new EspPredioController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_cond_esp_predio", dataController.getById);
  router.delete("/:cod_cond_esp_predio", dataController.delete);
  router.patch("/:cod_cond_esp_predio", dataController.update);

  return router;
};
