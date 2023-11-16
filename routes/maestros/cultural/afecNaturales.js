import { Router } from "express";

import { AfecNaturalesController } from "../../../controllers/maestros/cultural/afecNaturales.js";

export const createAfecNaturalesRouter = () => {
  const router = Router();

  const dataController = new AfecNaturalesController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_afec_natural", dataController.getById);
  router.delete("/:cod_afec_natural", dataController.delete);
  router.patch("/:cod_afec_natural", dataController.update);

  return router;
};
