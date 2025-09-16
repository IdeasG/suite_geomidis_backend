import { Router } from "express";
import { UsoHerramientasController } from "../../controllers/auditoria/usoHerramientas.js";
import { validarToken } from "../../middlewares/auth.js";

export const createRouteUsoHerramientas = () => {
  const router = Router();
  const controller = new UsoHerramientasController();
  // Logueados
  router.post("/logueado", validarToken, controller.registrarUsoLogueado);
  // Invitados
  router.post("/invitado", controller.registrarUsoInvitado);
  router.get("/", controller.listarUsos);
  return router;
};
