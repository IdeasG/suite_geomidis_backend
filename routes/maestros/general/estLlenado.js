import { Router } from "express";
import { EstLlenadoController } from "../../../controllers/maestros/general/estLlenado.js";

export const createEstLlenadoRouter = () => {
  const router = Router();

  const dataController = new EstLlenadoController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_est_llenado", dataController.getById);
  router.delete("/:cod_est_llenado", dataController.delete);
  router.patch("/:cod_est_llenado", dataController.update);

  return router;
};
