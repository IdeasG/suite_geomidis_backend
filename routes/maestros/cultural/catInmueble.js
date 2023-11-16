import { Router } from "express";
import { CatInmuebleController } from "../../../controllers/maestros/cultural/catInmueble.js";

export const createCatInmuebleRouter = () => {
  const router = Router();

  const dataController = new CatInmuebleController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_cat_inmueble", dataController.getById);
  router.delete("/:cod_cat_inmueble", dataController.delete);
  router.patch("/:cod_cat_inmueble", dataController.update);

  return router;
};
