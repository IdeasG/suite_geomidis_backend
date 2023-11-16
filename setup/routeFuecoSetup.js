import { createIdentConductorRouter } from "../routes/fichas/economica/identConductor";

export function setupFuecoRoutes(app) {
  const fuecoRutas = {
    conductor: createIdentConductorRouter(),
  };

  for (const [ruta, router] of Object.entries(fuecoRutas)) {
    app.use(`/fueco/${ruta}`, router);
  }
}
