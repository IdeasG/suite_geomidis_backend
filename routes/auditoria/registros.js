import { Router } from "express";
import { AuditoriaController } from "../../controllers/auditoria/registros.js";

import { cacheMiddleware } from "../../middlewares/redis.js";

export const createRouteAuditoria = () => {
  const AuditoriaRouter = Router();

  const auditoriaController = new AuditoriaController();
  // obtener capas
  AuditoriaRouter.get("/", cacheMiddleware, auditoriaController.getDatosAuditoria);

  return AuditoriaRouter;
};
