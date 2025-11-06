import express from "express";
import expressStatusMonitor from "express-status-monitor";
import { corsMiddleware } from "./middlewares/cors.js";
import { validarToken } from "./middlewares/auth.js";
import "dotenv/config";

import { createUbicacionPredioRouter } from "./routes/fichas/individual/ubicacionPredio.js";
import { createServicioPredioRouter } from "./routes/fichas/individual/servicioPredio.js";

import { setupServiciosGeoserverRouter } from "./setup/routeServiciosGeoserverSetup.js";
import { setupMaestroRoutes } from "./setup/routeMaestroSetup.js";
import { setupMapfishRoutes } from "./setup/routerImpresionMapfish.js";
import { setupPruebasRoutes } from "./setup/routePruebasSetup.js";
import { setupEspacialesRoutes } from "./setup/routeEspacialesSetup.js";
import { setupAuditoriaRoutes } from "./setup/routeAuditoriaSetup.js";
import { createObservacionPredioRouter } from "./routes/fichas/individual/observacionPredio.js";
import { createEvaluacionPredioRouter } from "./routes/fichas/individual/evaluacionPredio.js";
import { createUnicatRouter } from "./routes/fichas/unicat.js";
import { createAuthenticateRouter } from "./routes/security/authenticate.js";
import { createManagerRouter } from "./routes/suite/manager.js";
import { createAutomatizacionRouter } from "./routes/automatizacion/automatizacion.js";
import cron from 'node-cron';
import { checkAndExecuteServices } from './controllers/automatizacion/automatizacion_mejorado.js';
 
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { setupGlgisRoutes } from "./setup/routeGlgisSetup.js";
import { setupEtlRoutes } from "./setup/routeEtlSetup.js";
import { setupRasterRoutes } from "./setup/routeRasterSetup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(expressStatusMonitor());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(corsMiddleware());
app.use(express.static(path.join(__dirname, "")));

// Ruta protegida para el monitor de estado
// app.get("/status-monitor", validarToken, expressStatusMonitor().pageRoute);
app.get("/status-monitor", expressStatusMonitor().pageRoute);

app.disable("x-powered-by");

// Configurar el cronjob ÚNICO para verificar servicios diariamente a las 00:01 horas
// Este cron verifica TODOS los servicios (diarios, mensuales, anuales) y ejecuta solo los que correspondan
cron.schedule('1 0 * * *', () => {
  console.log('🕐 Iniciando verificación automática de servicios programados...');
  checkAndExecuteServices();
});

// // 🔧 ENDPOINT TEMPORAL PARA PRUEBAS MANUALES - RETORNA INFO DETALLADA
// app.get('/test/ejecutar-servicios', async (req, res) => {
//   try {
//     console.log('🧪 EJECUCIÓN MANUAL INICIADA DESDE ENDPOINT DE PRUEBA');
//     const resultado = await checkAndExecuteServices();
    
//     // Retornar toda la información detallada
//     res.json({
//       error: false,
//       message: 'Verificación de servicios ejecutada correctamente',
//       debug_info: resultado,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Error en ejecución manual:', error);
//     res.status(500).json({
//       error: true,
//       message: 'Error ejecutando verificación de servicios',
//       details: error.message,
//       stack: error.stack,
//       timestamp: new Date().toISOString()
//     });
//   }
// });


setupServiciosGeoserverRouter(app);
setupPruebasRoutes(app);
setupMaestroRoutes(app);
setupEspacialesRoutes(app);
setupGlgisRoutes(app);
setupMapfishRoutes(app);
setupAuditoriaRoutes(app);
setupEtlRoutes(app);
setupRasterRoutes(app);

app.use("/fcuin/ubicacion_predio", createUbicacionPredioRouter());
app.use("/tibc/servicio_predio", createServicioPredioRouter());
app.use("/tibc/observacion_predio", createObservacionPredioRouter());
app.use("/tibc/evaluacion_predio", createEvaluacionPredioRouter());
app.use("/unicat", createUnicatRouter());
app.use("/security", createAuthenticateRouter());
//SUITE
app.use("/suite", createManagerRouter());
//AUTOMATIZACION
app.use("/automatizacion", createAutomatizacionRouter());

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
