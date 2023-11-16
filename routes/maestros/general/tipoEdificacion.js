import { Router } from "express";
import { TipoEdificacionController } from "../../../controllers/maestros/general/tipoEdificacion.js";

export const createTipoEdificacionRouter = () => {
  const tipoEdificacionRouter = Router();
  const tipoEdificacionController = new TipoEdificacionController();

  tipoEdificacionRouter.get("/", tipoEdificacionController.getAll);
  tipoEdificacionRouter.get(
    "/clear-cache",
    tipoEdificacionController.clearCache
  );
  tipoEdificacionRouter.post("/", tipoEdificacionController.create);

  tipoEdificacionRouter.get(
    "/:cod_tipo_edificacion",
    tipoEdificacionController.getById
  );
  tipoEdificacionRouter.delete(
    "/:cod_tipo_edificacion",
    tipoEdificacionController.delete
  );
  tipoEdificacionRouter.patch(
    "/:cod_tipo_edificacion",
    tipoEdificacionController.update
  );

  return tipoEdificacionRouter;
};
