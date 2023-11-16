import { Router } from "express";
import { TipoInteriorController } from "../../../controllers/maestros/general/tipoInterior.js";

export const createTipoInteriorRouter = () => {
  const tipoInteriorRouter = Router();
  const tipoInteriorController = new TipoInteriorController();

  tipoInteriorRouter.get("/", tipoInteriorController.getAll);
  tipoInteriorRouter.get("/clear-cache", tipoInteriorController.clearCache);
  tipoInteriorRouter.post("/", tipoInteriorController.create);

  tipoInteriorRouter.get("/:cod_tipo_interior", tipoInteriorController.getById);
  tipoInteriorRouter.delete(
    "/:cod_tipo_interior",
    tipoInteriorController.delete
  );
  tipoInteriorRouter.patch(
    "/:cod_tipo_interior",
    tipoInteriorController.update
  );

  return tipoInteriorRouter;
};
