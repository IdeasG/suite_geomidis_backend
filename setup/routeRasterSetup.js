import { createRasterRouter } from "../routes/raster/raster.js";

export function setupRasterRoutes(app) {
  const rasterRutas = {
    comandos: createRasterRouter(),
  };

  for (const [ruta, router] of Object.entries(rasterRutas)) {
    app.use(`/raster/${ruta}`, router);
  }
}
