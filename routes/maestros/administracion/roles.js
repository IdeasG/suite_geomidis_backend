import { Router } from "express";
import { RolesController } from "../../../controllers/maestros/administracion/roles.js";

import { cacheMiddleware } from "../../../middlewares/redis.js";

export const createRolesRouter = () => {
    const rolesRouter = Router();

    const rolesController = new RolesController();

    rolesRouter.get("/", cacheMiddleware, rolesController.getAll);

    return rolesRouter;
};
