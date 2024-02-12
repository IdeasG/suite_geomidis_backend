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
  AuthenticateRouter.get("/rol", validarToken, authenticateController.getRol);
  AuthenticateRouter.get(
    "/rol/tools/:id",
    authenticateController.getToolsByRol
  );
  AuthenticateRouter.post("/rol", validarToken, authenticateController.saveRol);
  AuthenticateRouter.post("/rol/tools", authenticateController.saveRolTools);

  AuthenticateRouter.delete("/erol/:id", authenticateController.deleteRol);
  AuthenticateRouter.delete(
    "/rol/tools/:id_rol/:fk_modulo/:fk_grupo/:fk_menu",
    authenticateController.deleteRolTools
  );

  AuthenticateRouter.get(
    "/componentes/:id",
    validarToken,
    authenticateController.getComp
  );

  AuthenticateRouter.get(
    "/geoportales/:id_geoportal",
    validarToken,
    authenticateController.getComponentesByGeoportal
  );

  AuthenticateRouter.get(
    "/geoportales/invitado/:id_geoportal",
    authenticateController.getComponentesByGeoportalInvitado
  );

  AuthenticateRouter.get(
    "/geoportales",
    validarToken,
    authenticateController.getComponentesByGeoportalI
  );

  AuthenticateRouter.get(
    "/gestion/herramientas/:id_rol",
    validarToken,
    authenticateController.getComponentesByGeoportalByRol
  );

  AuthenticateRouter.get(
    "/geoportal/usuarios/:id",
    validarToken,
    authenticateController.getUsuariosByGeoportal
  );

  AuthenticateRouter.post(
    "/geoportal/usuarios",
    validarToken,
    authenticateController.createUsuariosByGeoportal
  );

  AuthenticateRouter.delete(
    "/geoportal/usuarios/:id",
    validarToken,
    authenticateController.deleteUsuariosByGeoportal
  );

  AuthenticateRouter.get(
    "/geoportal/internos",
    validarToken,
    authenticateController.getUsuariosInternoByGeoportal
  );

  AuthenticateRouter.put(
    "/geoportal/internos/:id_usuario",
    validarToken,
    authenticateController.updateUsuariosInternoByGeoportal
  );

  AuthenticateRouter.delete(
    "/geoportal/internos/:id_usuario",
    validarToken,
    authenticateController.deleteUsuariosInternoByGeoportal
  );

  AuthenticateRouter.post(
    "/geoportal/internos",
    validarToken,
    authenticateController.createUsuariosInternoByGeoportal
  );

  AuthenticateRouter.post(
    "/geoportal/rol",
    validarToken,
    authenticateController.createComponentByRol
  );

  return AuthenticateRouter;
};
