import { Router } from "express";
import { ElemArquitectonicoController } from "../../../controllers/maestros/cultural/elemArquitectonico.js";

export const createElemArquitectonicoRouter = () => {
  const router = Router();

  const dataController = new ElemArquitectonicoController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_elem_arq", dataController.getById);
  router.delete("/:cod_elem_arq", dataController.delete);
  router.patch("/:cod_elem_arq", dataController.update);

  return router;
};
