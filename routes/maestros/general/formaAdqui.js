import { Router } from "express";
import { FormaAdquiController } from "../../../controllers/maestros/general/formaAdqui.js";

export const createFormaAdquiRouter = () => {
  const router = Router();

  const dataController = new FormaAdquiController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_forma_adqui", dataController.getById);
  router.delete("/:cod_forma_adqui", dataController.delete);
  router.patch("/:cod_forma_adqui", dataController.update);

  return router;
};
