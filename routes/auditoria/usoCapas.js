import { Router } from "express";
import { UsoCapasController } from "../../controllers/auditoria/usoCapas.js";
import { validarToken } from "../../middlewares/auth.js";

export const createRouteUsoCapas = () => {
  const router = Router();
  const controller = new UsoCapasController();
  // Logueados
  router.post("/logueado", validarToken, controller.registrarUsoLogueado);
  // Invitados
  router.post("/invitado", controller.registrarUsoInvitado);
  router.get("/", controller.listarUsos);
  router.get("/agrupado/tipo_usuario/:c_tipo_usuario/:id_geovisor", controller.agrupadoPorTipoUsuarioFiltrado);
  router.get("/agrupado/rol/:id_rol/:id_geovisor", controller.agrupadoPorRol);
  router.get("/agrupado/usuario/:id_usuario/:id_geovisor", controller.agrupadoPorUsuario);
  router.get("/agrupado/fecha", controller.agrupadoPorFecha);
  return router;
};
