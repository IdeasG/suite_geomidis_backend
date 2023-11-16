import { Router } from "express";
import { FilCronologicoController } from "../../../controllers/maestros/cultural/filCronologico.js";

export const createFilCronologicoRouter = () => {
  const router = Router();

  const dataController = new FilCronologicoController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_fil_cronolog", dataController.getById);
  router.delete("/:cod_fil_cronolog", dataController.delete);
  router.patch("/:cod_fil_cronolog", dataController.update);

  return router;
};
