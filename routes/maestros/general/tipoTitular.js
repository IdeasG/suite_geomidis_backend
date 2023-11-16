import { Router } from "express";
import { TipoTitularController } from "../../../controllers/maestros/general/tipoTitular.js";

export const createTipoTitularRouter = () => {
  const router = Router();

  const dataController = new TipoTitularController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_tipo_titular", dataController.getById);
  router.delete("/:cod_tipo_titular", dataController.delete);
  router.patch("/:cod_tipo_titular", dataController.update);

  return router;
};
