import { Router } from "express";
import { AuditoriaController } from "../../controllers/auditoria/registros.js";

export const createRouteAuditoria = () => {
  const AuditoriaRouter = Router();

  const auditoriaController = new AuditoriaController();
  // obtener capas
  AuditoriaRouter.get("/", auditoriaController.getDatosAuditoria);

  return AuditoriaRouter;
};
