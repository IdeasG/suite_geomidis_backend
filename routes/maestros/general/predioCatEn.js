import { Router } from "express";
import { PredioCatEnController } from "../../../controllers/maestros/general/predioCatEn.js";

export const createPredioCatEnRouter = () => {
  const router = Router();

  const dataController = new PredioCatEnController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_predio_cat_en", dataController.getById);
  router.delete("/:cod_predio_cat_en", dataController.delete);
  router.patch("/:cod_predio_cat_en", dataController.update);

  return router;
};
