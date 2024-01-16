import { Router } from "express";
import { ManagerController } from "../../controllers/manager/manager.js";

export const createManagerRouter = () => {
  const managerRouter = Router();

  const managerController = new ManagerController();

  //GET
  managerRouter.get("/sistemas", managerController.getSistemas);
  managerRouter.get("/sistemas/:id", managerController.getSistemabyId);
  managerRouter.get("/capas/:id", managerController.getCapasById);
  //POST
  managerRouter.post("/sistemas/modulo", managerController.saveModuloSistema);
  managerRouter.post("/sistemas/grupo", managerController.saveGrupoSistema);
  managerRouter.post("/sistemas/menu", managerController.saveMenuSistema);

  managerRouter.post(
    "/capas/supergrupo",
    managerController.saveSuperGrupoSistema
  );
  managerRouter.post("/capas/grupo", managerController.saveGrupoCapasSistema);
  managerRouter.post("/capas/capas", managerController.saveCapasSistema);
  managerRouter.post("/capas/rol", managerController.saveCapasByRol);
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

  managerRouter.delete("/capas/rol/:id", managerController.deleteCapasByRol);

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

  return managerRouter;
};
