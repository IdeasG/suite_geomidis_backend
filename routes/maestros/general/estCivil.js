import { Router } from "express";
import { EstCivilController } from "../../../controllers/maestros/general/estCivil.js";

export const createEstCivilRouter = () => {
  const router = Router();

  const dataController = new EstCivilController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_est_civil", dataController.getById);
  router.delete("/:cod_est_civil", dataController.delete);
  router.patch("/:cod_est_civil", dataController.update);

  return router;
};
