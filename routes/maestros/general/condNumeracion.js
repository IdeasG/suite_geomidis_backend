import { Router } from "express";
import { CondNumeracionController } from "../../../controllers/maestros/general/condNumeracion.js";

export const createCondNumeracionRouter = () => {
  const condNumeracionRouter = Router();
  const condNumeracionController = new CondNumeracionController();

  condNumeracionRouter.get("/", condNumeracionController.getAll);
  condNumeracionRouter.get("/clear-cache", condNumeracionController.clearCache);
  condNumeracionRouter.post("/", condNumeracionController.create);

  condNumeracionRouter.get(
    "/:cod_cond_numeracion",
    condNumeracionController.getById
  );
  condNumeracionRouter.delete(
    "/:cod_cond_numeracion",
    condNumeracionController.delete
  );
  condNumeracionRouter.patch(
    "/:cod_cond_numeracion",
    condNumeracionController.update
  );

  return condNumeracionRouter;
};
