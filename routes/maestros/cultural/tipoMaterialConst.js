import { Router } from "express";
import { TipoMaterialConstController } from "../../../controllers/maestros/cultural/tipoMaterialConst.js";

export const createTipoMaterialConstRouter = () => {
  const router = Router();

  const dataController = new TipoMaterialConstController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_mat_const", dataController.getById);
  router.delete("/:cod_mat_const", dataController.delete);
  router.patch("/:cod_mat_const", dataController.update);

  return router;
};
