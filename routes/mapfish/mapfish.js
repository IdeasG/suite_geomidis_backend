import { Router } from "express";
import { MapfishController } from "../../controllers/mapfish/mapfish.js";

export const createRouteMapfish = () => {
  const MapaRouter = Router();

  const mapfishController = new MapfishController();
  MapaRouter.post("/", mapfishController.getPrint);
  MapaRouter.post("/subir", mapfishController.postImagen);
  MapaRouter.post("/eliminar", mapfishController.deleteImagen);
  // MapaRouter.post("/imagenes", cacheMiddleware, mapfishController.getPrint);

  return MapaRouter;
};
