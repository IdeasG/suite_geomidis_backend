import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import "dotenv/config";

import { createUbicacionPredioRouter } from "./routes/fichas/individual/ubicacionPredio.js";
import { createServicioPredioRouter } from "./routes/fichas/individual/servicioPredio.js";

import { setupMaestroRoutes } from "./setup/routeMaestroSetup.js";
import { setupMapfishRoutes } from "./setup/routerImpresionMapfish.js";
import { setupPruebasRoutes } from "./setup/routePruebasSetup.js";
import { setupEspacialesRoutes } from "./setup/routeEspacialesSetup.js";
import { createObservacionPredioRouter } from "./routes/fichas/individual/observacionPredio.js";
import { createEvaluacionPredioRouter } from "./routes/fichas/individual/evaluacionPredio.js";
import { createUnicatRouter } from "./routes/fichas/unicat.js";
import { createAuthenticateRouter } from "./routes/security/authenticate.js";
import cookieParser from "cookie-parser";
import { createManagerRouter } from "./routes/suite/manager.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { setupGlgisRoutes } from "./setup/routeGlgisSetup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// app.use(json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(corsMiddleware());
app.use(express.static(path.join(__dirname, "")));

app.disable("x-powered-by");
setupPruebasRoutes(app);
setupMaestroRoutes(app);
setupEspacialesRoutes(app);
setupGlgisRoutes(app);
setupMapfishRoutes(app);
//ficha economica
// setupFuecoRoutes(app);
// app.use("/capas/grupos", createCapasGrupoRouter());
app.use("/fcuin/ubicacion_predio", createUbicacionPredioRouter());
app.use("/tibc/servicio_predio", createServicioPredioRouter());
app.use("/tibc/observacion_predio", createObservacionPredioRouter());
app.use("/tibc/evaluacion_predio", createEvaluacionPredioRouter());
app.use("/unicat", createUnicatRouter());
app.use("/security", createAuthenticateRouter());
//SUITE
app.use("/suite", createManagerRouter());

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
