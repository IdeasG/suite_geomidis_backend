import { Router } from "express";
import { MapaBaseController } from "../../controllers/espaciales/mapa_base.js";

export const createRouteMapaBase = () => {
    const MapaBaseRouter = Router();

    const mapaBaseController = new MapaBaseController();

    MapaBaseRouter.get("/", mapaBaseController.getMapaBase);
    MapaBaseRouter.post("/", mapaBaseController.postMapaBase)
    MapaBaseRouter.delete("/:id_base", mapaBaseController.deleteMapaBase)
    MapaBaseRouter.put("/", mapaBaseController.putMapaBase)

    return MapaBaseRouter;
};
