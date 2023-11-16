import { Router } from "express";
import { EspTitularController } from "../../../controllers/maestros/general/espTitular.js";

export const createEspTitularRouter = () => {
  const router = Router();

  const dataController = new EspTitularController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_cond_esp_tit", dataController.getById);
  router.delete("/:cod_cond_esp_tit", dataController.delete);
  router.patch("/:cod_cond_esp_tit", dataController.update);

  return router;
};
