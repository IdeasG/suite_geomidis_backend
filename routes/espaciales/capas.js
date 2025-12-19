import { Router } from "express";
import { CapasController } from "../../controllers/espaciales/capas.js";
import { validarToken } from "../../middlewares/auth.js";

export const createRouteCapas = () => {
  const CapaRouter = Router();

  const capasController = new CapasController();
  
  // GET ROUTES
  CapaRouter.get("/publicados/geoportal", capasController.getPublicadosGeoportal);
  CapaRouter.get("/table", capasController.getAllCapasTable);
  CapaRouter.get("/table/externo", capasController.getAllCapasTableExterno);
  CapaRouter.get("/", capasController.getAllCapas);
  CapaRouter.get("/interno", validarToken, capasController.getAllCapasInternas);
  CapaRouter.get("/atributos/:tabla", capasController.getAtributos);
  CapaRouter.get("/grupos", capasController.getAllCapasGrupos);
  CapaRouter.get("/supergrupos", capasController.getAllCapasSupergrupos);
  CapaRouter.get("/esquemas", capasController.getAllEsquemas);
  CapaRouter.get("/tablas/esquema/:esquema", capasController.getAllTablasEspaciales);
  CapaRouter.get("/vistas", validarToken, capasController.getVistas);
  CapaRouter.get("/estructura", validarToken, capasController.getStructure);
  CapaRouter.get("/estructura/:id_geoportal", capasController.getStructureInvitado);
  CapaRouter.get("/visible/:id_capa/:id_rol", validarToken, capasController.getVisibles);
  CapaRouter.get("/visible/invitado/:id_capa/:id_cliente", capasController.getVisiblesInvitado);
  CapaRouter.get("/validaciondata", capasController.validacionData);
  CapaRouter.get("/json/fallido/:id", capasController.jsonFallido);
  CapaRouter.get("/filtro/afiliados/:idccpp", capasController.filtroAfiliados);

  // POST ROUTES
  CapaRouter.post("/", validarToken, capasController.getAllCapasPost);
  CapaRouter.post("/grupos", capasController.getAllCapasGruposPost);
  CapaRouter.post("/supergrupos", capasController.getAllCapasSupergruposPost);
  CapaRouter.post("/vistas", validarToken, capasController.postVistas);
  CapaRouter.post("/excel", capasController.descargarExcel);
  CapaRouter.post("/excel/ubigeo", capasController.descargarExcelUbigeo);
  CapaRouter.post("/excel/seleccionarea", capasController.descargarExcelSeleccionArea);
  CapaRouter.post("/excel/simple", capasController.descargarExcelSimple);
  CapaRouter.post("/excel/cruzada", capasController.descargarExcelCruzada);
  CapaRouter.post("/excel/solocapas", capasController.descargarExcelSoloCapas);
  CapaRouter.post("/excel/filtros/area", capasController.descargarExcelFiltros);
  CapaRouter.post("/excel/filtros/ccpp", capasController.descargarExcelFiltrosCCPP);
  CapaRouter.post("/excel/oferta-servicios", capasController.descargarExcelOfertaPorServicios);
  CapaRouter.post("/busquedaavanzada", capasController.busquedaAvanzada);
  CapaRouter.post("/archivoshape", capasController.archivoShape);
  CapaRouter.post("/archivojson", capasController.archivoJson);
  CapaRouter.post("/archivogeojson", capasController.archivoGeoJSON);
  CapaRouter.post("/filtro/servicios", capasController.filtroServicios);
  CapaRouter.post("/filtro/servicios/area", capasController.filtroServiciosArea);
  CapaRouter.post("/filtro/servicios/area/nocob", capasController.filtroServiciosAreaNoCob);
  CapaRouter.post("/filtro/servicios/generales", capasController.filtroServiciosGenerales);
  CapaRouter.post("/filtro/servicios/area/generales", capasController.filtroServiciosAreaGenerales);
  CapaRouter.post("/filtro/afiliados/area", capasController.filtroAfiliadosArea);
  CapaRouter.post("/filtro/ccpp/area/datosgeneral", capasController.filtroCCPPDatosGeneralArea);
  CapaRouter.post("/cruceinformacion", capasController.cruceInformacion);

  // PUT ROUTES
  CapaRouter.put("/", validarToken, capasController.getAllCapasPut);
  CapaRouter.put("/grupos", capasController.getAllCapasGruposPut);
  CapaRouter.put("/supergrupos", capasController.getAllCapasSupergruposPut);
  CapaRouter.put("/actualizar/visible", capasController.putVisibles);

  // DELETE ROUTES
  CapaRouter.delete("/:id_capa", validarToken, capasController.getAllCapasDelete);
  CapaRouter.delete("/grupos/:id_grupo", capasController.getAllCapasGruposDelete);
  CapaRouter.delete("/supergrupos/:id_super_grupo", capasController.getAllCapasSupergruposDelete);
  CapaRouter.delete("/vistas/:id_vista", validarToken, capasController.deleteVistas);

  return CapaRouter;
};
