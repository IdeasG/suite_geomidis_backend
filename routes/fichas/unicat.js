import { Router } from "express";

import { UnicatController } from "../../controllers/fichas/unicat.js";

export const createUnicatRouter = () => {
  const UnicatRouter = Router();

  const unicatController = new UnicatController();

  UnicatRouter.get("/", unicatController.getUnicat);
  UnicatRouter.get("/:search", unicatController.getUnicatBySearch);
  UnicatRouter.post("/", unicatController.addUnicat);
  UnicatRouter.put("/:id_unicat", unicatController.updateUnicat);
  return UnicatRouter;
};
