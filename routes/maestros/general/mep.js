import { Router } from "express";
import { MepController } from "../../../controllers/maestros/general/mep.js";

export const createMepRouter = () => {
  const router = Router();

  const dataController = new MepController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_mep", dataController.getById);
  router.delete("/:cod_mep", dataController.delete);
  router.patch("/:cod_mep", dataController.update);

  return router;
};
