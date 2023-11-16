import { Router } from "express";
import { TipoDocumentoController } from "../../../controllers/maestros/general/tipoDocumento.js";

export const createTipoDocumentoRouter = () => {
  const router = Router();

  const dataController = new TipoDocumentoController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_tipo_doc", dataController.getById);
  router.delete("/:cod_tipo_doc", dataController.delete);
  router.patch("/:cod_tipo_doc", dataController.update);

  return router;
};
