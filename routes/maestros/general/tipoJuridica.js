import { Router } from "express";
import { TipoJuridicaController } from "../../../controllers/maestros/general/tipoJuridica.js";

export const createTipoJuridicaRouter = () => {
  const router = Router();

  const dataController = new TipoJuridicaController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_tipo_perjuridica", dataController.getById);
  router.delete("/:cod_tipo_perjuridica", dataController.delete);
  router.patch("/:cod_tipo_perjuridica", dataController.update);

  return router;
};
