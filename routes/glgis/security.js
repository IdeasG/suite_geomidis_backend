import { Router } from "express";
import { SecurityController } from "../../controllers/glgis/security/index.js";

export const createSecurityRouter = () => {
  const securityRouter = Router();
  const securityController = new SecurityController();
  securityRouter.post("/user", securityController.create);
  securityRouter.get("/user", securityController.getAll);
  return securityRouter;
};
