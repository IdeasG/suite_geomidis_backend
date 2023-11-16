import { Router } from "express";
import { MantenimientoController } from "../../../controllers/maestros/general/mantenimiento.js";

export const createMantenimientoRouter = () => {
  const router = Router();

  const dataController = new MantenimientoController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_mantenimiento", dataController.getById);
  router.delete("/:cod_mantenimiento", dataController.delete);
  router.patch("/:cod_mantenimiento", dataController.update);

  return router;
};
