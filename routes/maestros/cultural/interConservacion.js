import { Router } from "express";
import { InterConservacionController } from "../../../controllers/maestros/cultural/interConservacion.js";

export const createInterConservacionRouter = () => {
  const router = Router();

  const dataController = new InterConservacionController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_interv_conserv", dataController.getById);
  router.delete("/:cod_interv_conserv", dataController.delete);
  router.patch("/:cod_interv_conserv", dataController.update);

  return router;
};
