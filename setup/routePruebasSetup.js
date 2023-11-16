import { createRoutePuatpias } from "../routes/pruebas/pruebas.js";

export function setupPruebasRoutes(app) {
    const maestrosRutas = {
        puatpias: createRoutePuatpias(),
    };

    for (const [ruta, router] of Object.entries(maestrosRutas)) {
        app.use(`/pruebas/${ruta}`, router);
    }
}
