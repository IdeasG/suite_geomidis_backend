import { Router } from "express";
import { ClasifPredioController } from "../../../controllers/maestros/general/clasifPredio.js";

export const createClasifPredioRouter = () => {
  const router = Router();

  const dataController = new ClasifPredioController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_clasif_predio", dataController.getById);
  router.delete("/:cod_clasif_predio", dataController.delete);
  router.patch("/:cod_clasif_predio", dataController.update);

  return router;
};
