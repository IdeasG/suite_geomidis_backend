import { Router } from "express";
import { CapasController } from "../../controllers/espaciales/capas.js";

import { cacheMiddleware } from "../../middlewares/redis.js";

export const createRouteCapas = () => {
  const CapaRouter = Router();

  const capasController = new CapasController();
  // obtener capas
  CapaRouter.get("/table", cacheMiddleware, capasController.getAllCapasTable);
  CapaRouter.get('/table/externo', cacheMiddleware,  capasController.getAllCapasTableExterno);
  CapaRouter.get("/", cacheMiddleware, capasController.getAllCapas);
  CapaRouter.get("/interno", cacheMiddleware, capasController.getAllCapasInternas);
  CapaRouter.get("/atributos/:tabla",cacheMiddleware,capasController.getAtributos);
  CapaRouter.get("/grupos", cacheMiddleware, capasController.getAllCapasGrupos);
  CapaRouter.get("/supergrupos",cacheMiddleware,capasController.getAllCapasSupergrupos);
  CapaRouter.get('/tablas/esquema', cacheMiddleware,  capasController.getAllTablasEspaciales);
  // registrar capas
  CapaRouter.post('/', cacheMiddleware,  capasController.getAllCapasPost);
  CapaRouter.post('/grupos', cacheMiddleware,  capasController.getAllCapasGruposPost);
  CapaRouter.post('/supergrupos', cacheMiddleware,  capasController.getAllCapasSupergruposPost);
  // actualizar capas
  CapaRouter.put('/', cacheMiddleware,  capasController.getAllCapasPut);
  CapaRouter.put('/grupos', cacheMiddleware,  capasController.getAllCapasGruposPut);
  CapaRouter.put('/supergrupos', cacheMiddleware,  capasController.getAllCapasSupergruposPut);
  // eliminar capas
  CapaRouter.delete('/:id_capa', cacheMiddleware,  capasController.getAllCapasDelete);
  CapaRouter.delete('/grupos/:id_grupo', cacheMiddleware,  capasController.getAllCapasGruposDelete);
  CapaRouter.delete('/supergrupos/:id_supergrupo', cacheMiddleware,  capasController.getAllCapasSupergruposDelete);

  CapaRouter.get("/vistas", cacheMiddleware, capasController.getVistas);
  CapaRouter.delete("/vistas/:id_vista", cacheMiddleware, capasController.deleteVistas);
  CapaRouter.post("/vistas", cacheMiddleware, capasController.postVistas);
  // CapaRouter.get("/estructura", cacheMiddleware, capasController.getStructure);
  CapaRouter.get("/estructura", capasController.getStructure);
  CapaRouter.get("/visible/:id_capa", capasController.getVisibles);
  CapaRouter.put("/actualizar/visible", capasController.putVisibles);
  CapaRouter.post("/excel", capasController.descargarExcel);
  CapaRouter.post("/excel/simple", capasController.descargarExcelSimple);
  CapaRouter.post("/excel/solocapas", capasController.descargarExcelSoloCapas);
  CapaRouter.post("/busquedaavanzada", capasController.busquedaAvanzada);
  CapaRouter.post("/archivoshape", capasController.archivoShape);

  CapaRouter.get("/validaciondata", capasController.validacionData);
  CapaRouter.get("/json/fallido/:id", capasController.jsonFallido);
  CapaRouter.post("/archivojson", capasController.archivoJson);


  return CapaRouter;
};
