import { Router } from "express";

import { ObservacionPredioController } from "../../../controllers/fichas/individual/observacionPredio.js";

export const createObservacionPredioRouter = () => {
  const ObservacionPredioRouter = Router();

  const observacionPredioController = new ObservacionPredioController();

  ObservacionPredioRouter.get("/", observacionPredioController.getObservacion);
  ObservacionPredioRouter.post("/", observacionPredioController.addObservacion);
  ObservacionPredioRouter.put(
    "/:id_observaciones",
    observacionPredioController.putObservacion
  );
  return ObservacionPredioRouter;
};
