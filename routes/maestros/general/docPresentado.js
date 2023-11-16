import { Router } from "express";
import { DocPresentadoController } from "../../../controllers/maestros/general/docPresentado.js";

export const createDocPresentadoRouter = () => {
  const router = Router();

  const dataController = new DocPresentadoController();

  router.get("/", dataController.getAll);
  router.post("/", dataController.create);
  router.get("/:cod_doc_presentado", dataController.getById);
  router.delete("/:cod_doc_presentado", dataController.delete);
  router.patch("/:cod_doc_presentado", dataController.update);

  return router;
};
