import { Router } from "express";
import { CondTitularController } from "../../../controllers/maestros/general/condTitular.js";

export const createCondTitularRouter = () => {
  const router = Router();

  const dataController = new CondTitularController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_cond", dataController.getById);
  router.delete("/:cod_cond", dataController.delete);
  router.patch("/:cod_cond", dataController.update);

  return router;
};
