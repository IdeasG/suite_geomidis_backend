import { Router } from "express";
import { RolesController } from "../../../controllers/maestros/administracion/roles.js";

export const createRolesRouter = () => {
    const rolesRouter = Router();

    const rolesController = new RolesController();

    rolesRouter.get("/", rolesController.getAll);

    return rolesRouter;
};
