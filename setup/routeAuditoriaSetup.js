import { createRouteAuditoria } from "../routes/auditoria/registros.js";
import { createRouteUsoCapas } from "../routes/auditoria/usoCapas.js";
import { createRouteUsoHerramientas } from "../routes/auditoria/usoHerramientas.js";

export function setupAuditoriaRoutes(app) {
  const maestrosRutas = {
    registros: createRouteAuditoria(),
    uso_capas: createRouteUsoCapas(),
    uso_herramientas: createRouteUsoHerramientas()
  };

  for (const [ruta, router] of Object.entries(maestrosRutas)) {
    app.use(`/auditoria/${ruta}`, router);
  }
}
