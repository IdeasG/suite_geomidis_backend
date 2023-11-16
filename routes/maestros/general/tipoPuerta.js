import { Router } from "express";
import { TipoPuertaController } from "../../../controllers/maestros/general/tipoPuerta.js";

export const createTipoPuertaRouter = () => {
  const tipoPuertaRouter = Router();
  const tipoPuertaController = new TipoPuertaController();

  tipoPuertaRouter.get("/", tipoPuertaController.getAll);
  tipoPuertaRouter.get("/clear-cache", tipoPuertaController.clearCache);
  tipoPuertaRouter.post("/", tipoPuertaController.create);
  tipoPuertaRouter.get("/:cod_tipo_puerta", tipoPuertaController.getById);
  tipoPuertaRouter.delete("/:cod_tipo_puerta", tipoPuertaController.delete);
  tipoPuertaRouter.patch("/:cod_tipo_puerta", tipoPuertaController.update);

  return tipoPuertaRouter;
};
