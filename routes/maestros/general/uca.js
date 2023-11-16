import { Router } from "express";
import { UcaController } from "../../../controllers/maestros/general/uca.js";

export const createUcaRouter = () => {
  const router = Router();

  const dataController = new UcaController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_uca", dataController.getById);
  router.delete("/:cod_uca", dataController.delete);
  router.patch("/:cod_uca", dataController.update);

  return router;
};
