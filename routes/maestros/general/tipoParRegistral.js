import { Router } from "express";
import { TipoParRegistralController } from "../../../controllers/maestros/general/tipoParRegistral.js";

export const createTipoParRegistralRouter = () => {
  const router = Router();

  const dataController = new TipoParRegistralController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_tipo_parregistral", dataController.getById);
  router.delete("/:cod_tipo_parregistral", dataController.delete);
  router.patch("/:cod_tipo_parregistral", dataController.update);

  return router;
};
