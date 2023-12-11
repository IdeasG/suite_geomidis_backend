import { Router } from "express";
import { MapfishController } from "../../controllers/mapfish/mapfish.js";

import { cacheMiddleware } from "../../middlewares/redis.js";

export const createRouteMapfish = () => {
  const MapaRouter = Router();

  const mapfishController = new MapfishController();
  // obtener capas
  MapaRouter.post("/leyenda", cacheMiddleware, mapfishController.getPrint);

  return MapaRouter;
};
