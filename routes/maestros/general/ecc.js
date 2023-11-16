import { Router } from "express";
import { EccController } from "../../../controllers/maestros/general/ecc.js";

export const createEccRouter = () => {
  const router = Router();

  const dataController = new EccController();

  router.get("/", dataController.getAll); // whitout cache
  router.post("/", dataController.create);
  router.get("/:cod_ecc", dataController.getById);
  router.delete("/:cod_ecc", dataController.delete);
  router.patch("/:cod_ecc", dataController.update);

  return router;
};
