import { Router } from "express";

import { EvaluacionPredioController } from "../../../controllers/fichas/individual/evaluacionPredio.js";

export const createEvaluacionPredioRouter = () => {
  const EvaluacionPredioRouter = Router();

  const evaluacionPredioController = new EvaluacionPredioController();

  EvaluacionPredioRouter.get("/", evaluacionPredioController.getEvaluacion);
  EvaluacionPredioRouter.post("/", evaluacionPredioController.addEvaluacion);
  EvaluacionPredioRouter.put(
    "/:id_evaluacion",
    evaluacionPredioController.putEvaluacion
  );
  return EvaluacionPredioRouter;
};
