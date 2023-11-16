import { Router } from "express";
import { CapasGrupoController } from "../../../controllers/maestros/administracion/capasGrupo.js";

import { cacheMiddleware } from "../../../middlewares/redis.js";

export const createCapasGrupoRouter = () => {
    const capasGrupoRouter = Router();

    const capasGrupoController = new CapasGrupoController();

    capasGrupoRouter.get("/", cacheMiddleware, capasGrupoController.getAll);

    return capasGrupoRouter;
};
