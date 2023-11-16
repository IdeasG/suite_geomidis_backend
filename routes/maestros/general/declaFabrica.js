import { Router } from "express";
import { DeclaFabricaController } from "../../../controllers/maestros/general/declaFabrica.js";

export const createDeclaFabricaRouter = () => {
  const router = Router();

  const dataController = new DeclaFabricaController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_decla_fabrica", dataController.getById);
  router.delete("/:cod_decla_fabrica", dataController.delete);
  router.patch("/:cod_decla_fabrica", dataController.update);

  return router;
};
