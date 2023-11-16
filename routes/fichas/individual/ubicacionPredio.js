import { Router } from "express";
import { cacheMiddleware } from "../../../middlewares/redis.js";

import { UbicacionPredioController } from "../../../controllers/fichas/individual/ubicacionPredio.js";

export const createUbicacionPredioRouter = () => {
  const ubicacionPredioRouter = Router();

  const ubicacionPredioController = new UbicacionPredioController();

  ubicacionPredioRouter.get("/", ubicacionPredioController.getAllMaestros);
  ubicacionPredioRouter.get("/detail", ubicacionPredioController.getUbiPredio);

  ubicacionPredioRouter.post("/add_vias", ubicacionPredioController.addVias);

  ubicacionPredioRouter.delete(
    "/:id_ubicacion_via_cuadra",
    ubicacionPredioController.deleteVias
  );
  ubicacionPredioRouter.post("/", ubicacionPredioController.addUbicacionPredio);
  ubicacionPredioRouter.put(
    "/:id_ubicacion",
    ubicacionPredioController.updateUbicacionPredio
  );

  return ubicacionPredioRouter;
};
