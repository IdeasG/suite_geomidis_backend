import { createSecurityRouter } from "../routes/glgis/security.js";

export function setupGlgisRoutes(app) {
  const glgisRutas = {
    security: createSecurityRouter(),
  };

  for (const [ruta, router] of Object.entries(glgisRutas)) {
    app.use(`/glgis/${ruta}`, router);
  }
}
