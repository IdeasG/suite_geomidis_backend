import { Router } from "express";
import { AfecAntropicasController } from "../../../controllers/maestros/cultural/afecAntropicas.js";

export const createAfecAntropicasRouter = () => {
  const router = Router();

  const dataController = new AfecAntropicasController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_afec_antrop", dataController.getById);
  router.delete("/:cod_afec_antrop", dataController.delete);
  router.patch("/:cod_afec_antrop", dataController.update);

  return router;
};
