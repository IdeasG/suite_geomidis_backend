import { Router } from "express";

import { ServicioPredioController } from "../../../controllers/fichas/individual/servicioPredio.js";

export const createServicioPredioRouter = () => {
  const ServicioPredioRouter = Router();

  const servicioPredioController = new ServicioPredioController();

  ServicioPredioRouter.get("/", servicioPredioController.getServicios);
  ServicioPredioRouter.post("/", servicioPredioController.addServicios);
  ServicioPredioRouter.put(
    "/:id_servicio",
    servicioPredioController.updateServicios
  );
  ServicioPredioRouter.delete(
    "/:id_servicio",
    servicioPredioController.deleteServicios
  );

  return ServicioPredioRouter;
};
