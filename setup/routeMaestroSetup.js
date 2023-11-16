import { createTipoViaRouter } from "../routes/maestros/general/tipoVia.js";
import { createTipoPuertaRouter } from "../routes/maestros/general/tipoPuerta.js";
import { createCondNumeracionRouter } from "../routes/maestros/general/condNumeracion.js";
import { createTipoEdificacionRouter } from "../routes/maestros/general/tipoEdificacion.js";
import { createTipoInteriorRouter } from "../routes/maestros/general/tipoInterior.js";
import { createCapasGrupoRouter } from "../routes/maestros/administracion/capasGrupo.js";
import { createCapasSuperGrupoRouter } from "../routes/maestros/administracion/capasSuperGrupo.js";
import { createRolesRouter } from "../routes/maestros/administracion/roles.js";
import { createTipoTitularRouter } from "../routes/maestros/general/tipoTitular.js";
import { createTipoDocumentoRouter } from "../routes/maestros/general/tipoDocumento.js";
import { createCondTitularRouter } from "../routes/maestros/general/condTitular.js";
import { createCondDeclaranteRouter } from "../routes/maestros/general/condDeclarante.js";
import { createDocPresentadoRouter } from "../routes/maestros/general/docPresentado.js";
import { createEstLlenadoRouter } from "../routes/maestros/general/estLlenado.js";
import { createMantenimientoRouter } from "../routes/maestros/general/mantenimiento.js";
import { createEstCivilRouter } from "../routes/maestros/general/estCivil.js";
import { createTipoJuridicaRouter } from "../routes/maestros/general/tipoJuridica.js";
import { createEspTitularRouter } from "../routes/maestros/general/espTitular.js";
import { createFormaAdquiRouter } from "../routes/maestros/general/formaAdqui.js";
import { createEspPredioRouter } from "../routes/maestros/general/espPredio.js";
import { createClasifPredioRouter } from "../routes/maestros/general/clasifPredio.js";
import { createPredioCatEnRouter } from "../routes/maestros/general/predioCatEn.js";
import { createMepRouter } from "../routes/maestros/general/mep.js";
import { createEcsRouter } from "../routes/maestros/general/ecs.js";
import { createEccRouter } from "../routes/maestros/general/ecc.js";
import { createUcaRouter } from "../routes/maestros/general/uca.js";
import { createFcTipoDocRouter } from "../routes/maestros/general/fcTipoDoc.js";
import { createTipoParRegistralRouter } from "../routes/maestros/general/tipoParRegistral.js";
import { createDeclaFabricaRouter } from "../routes/maestros/general/declaFabrica.js";
import { createCatInmuebleRouter } from "../routes/maestros/cultural/catInmueble.js";
import { createFilCronologicoRouter } from "../routes/maestros/cultural/filCronologico.js";
import { createTipoAquitecturaMapRouter } from "../routes/maestros/cultural/tipoArquitecturaMap.js";
import { createTipoMaterialConstRouter } from "../routes/maestros/cultural/tipoMaterialConst.js";
import { createAfecNaturalesRouter } from "../routes/maestros/cultural/afecNaturales.js";
import { createAfecAntropicasRouter } from "../routes/maestros/cultural/afecAntropicas.js";
import { createInterConservacionRouter } from "../routes/maestros/cultural/interConservacion.js";
import { createTipoAquitecturaMhcRouter } from "../routes/maestros/cultural/tipoArquitecturaMhc.js";
import { createElemArquitectonicoRouter } from "../routes/maestros/cultural/elemArquitectonico.js";
import { createFilEstilisticaRouter } from "../routes/maestros/cultural/filEstilistica.js";
import { createEstElemEstructuraAcabadoRouter } from "../routes/maestros/cultural/estElemEstructuraAcabado.js";
import { createInterInmuebleRouter } from "../routes/maestros/cultural/interInmueble.js";

export function setupMaestroRoutes(app) {
  const maestrosRutas = {
    tipo_via: createTipoViaRouter(),
    tipo_puerta: createTipoPuertaRouter(),
    cond_numeracion: createCondNumeracionRouter(),
    tipo_edificacion: createTipoEdificacionRouter(),
    tipo_interior: createTipoInteriorRouter(),
    capas_grupo: createCapasGrupoRouter(),
    capas_supergrupo: createCapasSuperGrupoRouter(),
    roles: createRolesRouter(),

    tipoTitular: createTipoTitularRouter(),
    tipoDoc: createTipoDocumentoRouter(),
    condTitular: createCondTitularRouter(),
    condDeclarante: createCondDeclaranteRouter(),
    docPresentado: createDocPresentadoRouter(),
    estLlenado: createEstLlenadoRouter(),
    mantenimiento: createMantenimientoRouter(),
    estCivil: createEstCivilRouter(),
    tipoPerJuridica: createTipoJuridicaRouter(),
    condEspTitular: createEspTitularRouter(),
    formaAdqui: createFormaAdquiRouter(),
    condEspPredio: createEspPredioRouter(),
    clasifPredio: createClasifPredioRouter(),
    predioCatEn: createPredioCatEnRouter(),
    mep: createMepRouter(),
    ecs: createEcsRouter(),
    ecc: createEccRouter(),
    uca: createUcaRouter(),
    fcTipoDoc: createFcTipoDocRouter(),
    tipoParRegistral: createTipoParRegistralRouter(),
    declaFabrica: createDeclaFabricaRouter(),

    catInmueble: createCatInmuebleRouter(),
    filCronologica: createFilCronologicoRouter(),
    tipoArquitecturaMap: createTipoAquitecturaMapRouter(),
    tipoArquitecturaMhc: createTipoAquitecturaMhcRouter(),
    tipoMaterialConst: createTipoMaterialConstRouter(),
    afecNaturales: createAfecNaturalesRouter(),
    afecAntropicas: createAfecAntropicasRouter(),
    interConservacion: createInterConservacionRouter(),
    elemArquitectonico: createElemArquitectonicoRouter(),
    filEstilistica: createFilEstilisticaRouter(),
    estElemEstructuraAcabado: createEstElemEstructuraAcabadoRouter(),
    interInmueble: createInterInmuebleRouter(),
  };

  for (const [ruta, router] of Object.entries(maestrosRutas)) {
    app.use(`/maestros/${ruta}`, router);
  }
}
