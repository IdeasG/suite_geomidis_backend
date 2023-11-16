import { Router } from "express";
import { CapasSuperGrupoController } from "../../../controllers/maestros/administracion/capasSuperGrupo.js";

import { cacheMiddleware } from "../../../middlewares/redis.js";

export const createCapasSuperGrupoRouter = () => {
    const capasSuperGrupoRouter = Router();

    const capasSuperGrupoController = new CapasSuperGrupoController();

    capasSuperGrupoRouter.get("/", cacheMiddleware, capasSuperGrupoController.getAll);

    return capasSuperGrupoRouter;
};
