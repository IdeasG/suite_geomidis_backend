import { Router } from "express";
import { TipoViaController } from "../../../controllers/maestros/general/tipoVia.js";

import { cacheMiddleware } from "../../../middlewares/redis.js";

export const createTipoViaRouter = () => {
  const tipoViaRouter = Router();

  const tipoViaController = new TipoViaController();

  tipoViaRouter.get("/", cacheMiddleware, tipoViaController.getAll);
  tipoViaRouter.get("/clear-cache", tipoViaController.clearCache);

  tipoViaRouter.post("/", tipoViaController.create);

  tipoViaRouter.get("/:cod_tipo_via", tipoViaController.getById);
  tipoViaRouter.delete("/:cod_tipo_via", tipoViaController.delete);
  tipoViaRouter.patch("/:cod_tipo_via", tipoViaController.update);

  return tipoViaRouter;
};
