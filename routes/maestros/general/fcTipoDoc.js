import { Router } from "express";
import { FcTipoDocController } from "../../../controllers/maestros/general/fcTipoDoc.js";

export const createFcTipoDocRouter = () => {
  const router = Router();

  const dataController = new FcTipoDocController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_fc_tipo_doc", dataController.getById);
  router.delete("/:cod_fc_tipo_doc", dataController.delete);
  router.patch("/:cod_fc_tipo_doc", dataController.update);

  return router;
};
