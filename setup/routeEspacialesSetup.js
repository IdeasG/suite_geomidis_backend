import { createRouteCapas } from "../routes/espaciales/capas.js";
import { createRouteSML } from "../routes/espaciales/sml.js";
import { createRouteExtent } from "../routes/espaciales/extent.js";
import { createRouteViasCuadras } from "../routes/espaciales/vias_cuadras.js";
import { createRouteMapaBase } from "../routes/espaciales/mapa_base.js";

export function setupEspacialesRoutes(app) {
    const maestrosRutas = {
        capas: createRouteCapas(),
        sml: createRouteSML(),
        extent: createRouteExtent(),
        vias_cuadras: createRouteViasCuadras(),
        mapa_base: createRouteMapaBase()
    };

    for (const [ruta, router] of Object.entries(maestrosRutas)) {
        app.use(`/espaciales/${ruta}`, router);
    }
}
