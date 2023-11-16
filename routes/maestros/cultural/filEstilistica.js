import { Router } from "express";
import { FilEstilisticaController } from "../../../controllers/maestros/cultural/filEstilistica.js";

export const createFilEstilisticaRouter = () => {
  const router = Router();

  const dataController = new FilEstilisticaController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_fil_estilistica", dataController.getById);
  router.delete("/:cod_fil_estilistica", dataController.delete);
  router.patch("/:cod_fil_estilistica", dataController.update);

  return router;
};
