import { Router } from "express";
import { CapasGrupoController } from "../../../controllers/maestros/administracion/capasGrupo.js";

export const createCapasGrupoRouter = () => {
    const capasGrupoRouter = Router();

    const capasGrupoController = new CapasGrupoController();

    capasGrupoRouter.get("/", capasGrupoController.getAll);

    return capasGrupoRouter;
};
