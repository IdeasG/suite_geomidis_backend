import { Router } from "express";
import { EcsController } from "../../../controllers/maestros/general/ecs.js";

export const createEcsRouter = () => {
  const router = Router();

  const dataController = new EcsController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_ecs", dataController.getById);
  router.delete("/:cod_ecs", dataController.delete);
  router.patch("/:cod_ecs", dataController.update);

  return router;
};
