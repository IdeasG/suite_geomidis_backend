import { Router } from "express";
import { CondDeclaranteController } from "../../../controllers/maestros/general/condDeclarante.js";

export const createCondDeclaranteRouter = () => {
  const router = Router();

  const dataController = new CondDeclaranteController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_cond_decla", dataController.getById);
  router.delete("/:cod_cond_decla", dataController.delete);
  router.patch("/:cod_cond_decla", dataController.update);

  return router;
};
