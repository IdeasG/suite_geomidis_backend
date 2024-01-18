import { Router } from "express";

import { AuthenticateController } from "../../controllers/security/authenticate.js";

import { validarRefreshToken, validarToken } from "../../middlewares/auth.js";

export const createAuthenticateRouter = () => {
  const AuthenticateRouter = Router();

  const authenticateController = new AuthenticateController();
  AuthenticateRouter.post("/singin", authenticateController.signIn);
  AuthenticateRouter.post(
    "/refresh",
    validarRefreshToken,
    authenticateController.refreshToken
  );
  AuthenticateRouter.get(
    "/tools",
    validarToken,
    authenticateController.getTools
  );
  //PROFILE
  AuthenticateRouter.get(
    "/profile",
    validarToken,
    authenticateController.getProfile
  );

  //ROLES
  AuthenticateRouter.get("/rol", authenticateController.getRol);
  AuthenticateRouter.get(
    "/rol/tools/:id",
    authenticateController.getToolsByRol
  );
  AuthenticateRouter.post("/rol", authenticateController.saveRol);
  AuthenticateRouter.post("/rol/tools", authenticateController.saveRolTools);
  AuthenticateRouter.delete(
    "/rol/tools/:id_rol/:fk_modulo/:fk_grupo/:fk_menu",
    authenticateController.deleteRolTools
  );
  AuthenticateRouter.delete("/rol/:id", authenticateController.deleteRol);

  AuthenticateRouter.get(
    "/componentes/:id",
    validarToken,
    authenticateController.getComp
  );

  return AuthenticateRouter;
};
