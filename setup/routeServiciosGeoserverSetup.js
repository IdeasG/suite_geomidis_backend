import { createServiciosGeoserverRouter } from "../routes/geoserver/geoserver.js";

export function setupServiciosGeoserverRouter(app) {
  const maestrosRutas = {
    servicios: createServiciosGeoserverRouter(),
  };

  for (const [ruta, router] of Object.entries(maestrosRutas)) {
    app.use(`/geoserver/${ruta}`, router);
  }
}
