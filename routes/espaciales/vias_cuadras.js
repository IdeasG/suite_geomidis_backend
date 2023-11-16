import { Router } from "express";
import { ViasCuadrasController } from "../../controllers/espaciales/vias_cuadras.js";

export const createRouteViasCuadras = () => {
    const ViasCuadrasRouter = Router();

    const viasCuadrasController = new ViasCuadrasController();

    ViasCuadrasRouter.get("/tipo_vias", viasCuadrasController.getTipoVias);
    ViasCuadrasRouter.get("/vias/:cod_tipo_via", viasCuadrasController.getVias);
    ViasCuadrasRouter.get("/cuadras/:id_via", viasCuadrasController.getCuadras);

    return ViasCuadrasRouter;
};
