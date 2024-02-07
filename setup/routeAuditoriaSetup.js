import { createRouteAuditoria } from "../routes/auditoria/registros.js";

export function setupAuditoriaRoutes(app) {
  const maestrosRutas = {
    registros: createRouteAuditoria()
  };

  for (const [ruta, router] of Object.entries(maestrosRutas)) {
    app.use(`/auditoria/${ruta}`, router);
  }
}
