import { Router } from "express";
import { GeoserverController } from "../../controllers/geoserver/geoserver.js";

export const createServiciosGeoserverRouter = () => {
  const geoserverRouter = Router();
  const geoserverController = new GeoserverController();
  geoserverRouter.post("/", geoserverController.getDataGeoserver);
  return geoserverRouter;
};
