import { Router } from "express";
import { ManagerController } from "../../controllers/manager/manager.js";
import { validarToken } from "../../middlewares/auth.js";

export const createManagerRouter = () => {
  const managerRouter = Router();

  const managerController = new ManagerController();

  //GET
  managerRouter.get("/sistemas", managerController.getSistemas);
  managerRouter.get("/sistemas/:id", managerController.getSistemabyId);
  managerRouter.get("/capas/:id", managerController.getCapasById);
  managerRouter.get("/actividades", managerController.getActividades);
  managerRouter.get("/actividades/fotos", managerController.getActividadesFotos);
  //POST
  managerRouter.post("/sistemas/modulo", managerController.saveModuloSistema);
  managerRouter.post("/sistemas/grupo", managerController.saveGrupoSistema);
  managerRouter.post("/sistemas/menu", managerController.saveMenuSistema);
  managerRouter.post("/actividades", managerController.saveActividades);
  managerRouter.post("/actividades/fotos", managerController.postActividadesFotos);
  //PUT
  managerRouter.put("/actividades/:id_actividad", managerController.updateActividades);
  //DELETE
  managerRouter.delete("/actividades/:id_actividad", managerController.deleteActividades);
  managerRouter.delete("/actividades/fotos/:id_foto", managerController.deleteActividadesFotos);

  managerRouter.post(
    "/capas/supergrupo",
    managerController.saveSuperGrupoSistema
  );
  managerRouter.post("/capas/grupo", managerController.saveGrupoCapasSistema);
  managerRouter.post("/capas/capas", managerController.saveCapasSistema);
  managerRouter.post(
    "/capas/rol",
    validarToken,
    managerController.saveCapasByRol
  );
  managerRouter.post(
    "/capas/rol/orden",
    validarToken,
    managerController.saveOrdenByRol
  );
  managerRouter.get(
    "/capas/rol/orden",
    validarToken,
    managerController.getOrdenByRol
  );
  managerRouter.get(
    "/capas/rol/orden/invitado/:id_cliente",
    managerController.getOrdenByRolInvitado
  );
  //DELETE
  managerRouter.delete(
    "/sistemas/modulo/:id",
    managerController.deleteModuloSistema
  );
  managerRouter.delete(
    "/sistemas/grupo/:id",
    managerController.deleteGrupoSistema
  );
  managerRouter.delete(
    "/sistemas/menu/:id",
    managerController.deleteMenuSistema
  );

  managerRouter.delete(
    "/capas/rol/:id",
    validarToken,
    managerController.deleteCapasByRol
  );

  //GET CLIENTES
  managerRouter.get("/clientes", managerController.getClientes);
  managerRouter.get("/clientes/:id", managerController.getClientesById);
  managerRouter.get(
    "/clientes/sistemas/:id",
    managerController.getSistemasByClientes
  );

  //POST CLIENTES
  managerRouter.post(
    "/clientes/sistemas",
    managerController.saveSistemasByCliente
  );

  managerRouter.post("/clientes", managerController.saveCliente);

  //DELETE CLIENTES
  managerRouter.delete(
    "/clientes/sistemas/:id_cliente/:id",
    managerController.deleteSistemasByCliente
  );

  managerRouter.delete("/clientes/:id", managerController.deleteCliente);

  //GEOPORTALES
  managerRouter.post("/geoportales", managerController.saveGeoportales);
  managerRouter.put("/geoportales/:id", managerController.editGeoportales);
  managerRouter.delete("/geoportales/:id", managerController.deleteGeoportales);

  //SOLICITUDES DE ACCESO
  managerRouter.post("/register/geoportal", managerController.saveSolicitud);
  managerRouter.post("/reset/password", managerController.sendMessage);

  return managerRouter;
};
