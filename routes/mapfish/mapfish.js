import { Router } from "express";
import { MapfishController } from "../../controllers/mapfish/mapfish.js";

import { cacheMiddleware } from "../../middlewares/redis.js";

export const createRouteMapfish = () => {
  const MapaRouter = Router();

  const mapfishController = new MapfishController();
  MapaRouter.post("/", cacheMiddleware, mapfishController.getPrint);
  MapaRouter.post("/subir", cacheMiddleware, mapfishController.postImagen);
  // MapaRouter.post("/imagenes", cacheMiddleware, mapfishController.getPrint);

  return MapaRouter;
};
