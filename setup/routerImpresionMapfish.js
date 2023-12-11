import { createRouteMapfish } from "../routes/mapfish/mapfish.js";

export function setupMapfishRoutes(app) {
    const maestrosRutas = {
        mapa: createRouteMapfish()
    };

    for (const [ruta, router] of Object.entries(maestrosRutas)) {
        app.use(`/mapfish/${ruta}`, router);
    }
}
