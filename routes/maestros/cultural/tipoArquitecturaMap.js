import { Router } from "express";
import { TipoArquitecturaMapController } from "../../../controllers/maestros/cultural/tipoArquitecturaMap.js";

export const createTipoAquitecturaMapRouter = () => {
  const router = Router();

  const dataController = new TipoArquitecturaMapController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_tipo_arq_map", dataController.getById);
  router.delete("/:cod_tipo_arq_map", dataController.delete);
  router.patch("/:cod_tipo_arq_map", dataController.update);

  return router;
};
