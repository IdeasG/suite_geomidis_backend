import { Router } from "express";
import { TipoArquitecturaMhcController } from "../../../controllers/maestros/cultural/tipoArquitecturaMhc.js";

export const createTipoAquitecturaMhcRouter = () => {
  const router = Router();

  const dataController = new TipoArquitecturaMhcController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_tipo_arq_mhc", dataController.getById);
  router.delete("/:cod_tipo_arq_mhc", dataController.delete);
  router.patch("/:cod_tipo_arq_mhc", dataController.update);

  return router;
};
