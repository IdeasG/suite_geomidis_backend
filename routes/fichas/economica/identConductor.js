import { Router } from "express";

import { IdentConductorController } from "../../../controllers/fichas/economica/identConductor";

export const createIdentConductorRouter = () => {
  const router = Router();

  const controller = new IdentConductorController();

  router.get("/:id_ficha", controller.getIdentConductor);

  return controller;
};
