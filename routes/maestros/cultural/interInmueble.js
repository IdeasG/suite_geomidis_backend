import { Router } from "express";
import { InterInmuebleController } from "../../../controllers/maestros/cultural/interInmueble.js";

export const createInterInmuebleRouter = () => {
  const router = Router();

  const dataController = new InterInmuebleController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_inter_inmueble", dataController.getById);
  router.delete("/:cod_inter_inmueble", dataController.delete);
  router.patch("/:cod_inter_inmueble", dataController.update);

  return router;
};
