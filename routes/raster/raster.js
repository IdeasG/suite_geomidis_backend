import { Router } from "express";
import { RasterController } from "../../controllers/raster/raster.js";

export const createRasterRouter = () => {
  const rasterRouter = Router();
  const rasterController = new RasterController();
  rasterRouter.post("/", rasterController.create);
  return rasterRouter;
};
