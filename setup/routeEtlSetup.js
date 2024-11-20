import { creatEtlRouter } from "../routes/etl/etl.js";

export function setupEtlRoutes(app) {
  const etlRutas = {
    table: creatEtlRouter(),
  };

  for (const [ruta, router] of Object.entries(etlRutas)) {
    app.use(`/etl/${ruta}`, router);
  }
}
