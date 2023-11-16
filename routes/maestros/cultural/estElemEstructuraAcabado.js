import { Router } from "express";
import { EstElemEstructuraAcabadoController } from "../../../controllers/maestros/cultural/estElemEstructuraAcabado.js";

export const createEstElemEstructuraAcabadoRouter = () => {
  const router = Router();

  const dataController = new EstElemEstructuraAcabadoController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_elem_estruc_acab", dataController.getById);
  router.delete("/:cod_elem_estruc_acab", dataController.delete);
  router.patch("/:cod_elem_estruc_acab", dataController.update);

  return router;
};
