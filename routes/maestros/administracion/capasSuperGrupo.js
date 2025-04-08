import { Router } from "express";
import { CapasSuperGrupoController } from "../../../controllers/maestros/administracion/capasSuperGrupo.js";

export const createCapasSuperGrupoRouter = () => {
    const capasSuperGrupoRouter = Router();

    const capasSuperGrupoController = new CapasSuperGrupoController();

    capasSuperGrupoRouter.get("/", capasSuperGrupoController.getAll);

    return capasSuperGrupoRouter;
};
