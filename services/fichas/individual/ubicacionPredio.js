import UbicacionPredioVia from "../../../models/fichas/individual/ubicacionPredioVia.js";
import UbicacionPredioViaDetail from "../../../models/fichas/individual/ubicacionPredioViaDetail.js";
import UbicacionPredio from "../../../models/fichas/individual/ubicacionPredio.js";
import UbicacionPredioDetail from "../../../models/fichas/individual/ubicacionPredioDetail.js";

import { CondNumeracionService } from "../../maestros/general/condNumeracion.js";
import { TipoEdificacionService } from "../../maestros/general/tipoEdificacion.js";
import { TipoInteriorService } from "../../maestros/general/tipoInterior.js";
import { TipoPuertaService } from "../../maestros/general/tipoPuerta.js";

import { SpViasService } from "../../maestros/spVias.js";
import { HabUrbanaService } from "../../maestros/habUrbana.js";

const condNumeracionService = new CondNumeracionService();
const tipoEdificacionService = new TipoEdificacionService();
const tipoInteriorService = new TipoInteriorService();
const tipoPuertaService = new TipoPuertaService();
const spViasService = new SpViasService();
const habUrbanaService = new HabUrbanaService();

export class UbicacionPredioService {
  async addVias(
    id_ficha,
    id_via,
    id_cuadra,
    cod_tipo_puerta,
    n_num_muni,
    cod_cond_num,
    n_nro_cert_num
  ) {
    try {
      const ubicacionPredioVia = await UbicacionPredioVia.create({
        id_ficha,
        id_via,
        id_cuadra,
        cod_tipo_puerta,
        n_num_muni,
        cod_cond_num,
        n_nro_cert_num,
      });
      return ubicacionPredioVia;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async deleteUbiVias(id_ubicacion_via_cuadra) {
    try {
      const ubicacionPredioVia = await UbicacionPredioVia.destroy({
        where: {
          id_ubicacion_via_cuadra: id_ubicacion_via_cuadra,
        },
      });
      return ubicacionPredioVia;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async addUbicacionPredio(
    id_ficha,
    c_nomb_edificacion,
    cod_tipo_edificacion,
    cod_tipo_interior,
    n_num_interior,
    id_hab_urb,
    c_zse_hab_urb,
    c_manzana_hab_urb,
    c_lote_hab_urb,
    c_sublote_hab_urb,
    estpriedad
  ) {
    try {
      const ubicacionPredioVia = await UbicacionPredio.create({
        id_ficha,
        c_nomb_edificacion,
        cod_tipo_edificacion,
        cod_tipo_interior,
        n_num_interior,
        id_hab_urb,
        c_zse_hab_urb,
        c_manzana_hab_urb,
        c_lote_hab_urb,
        c_sublote_hab_urb,
        estpriedad,
      });
      return ubicacionPredioVia;
    } catch (error) {
      throw new Error("Error al crear la ubicacion del predio.");
    }
  }

  async updateUbicacionPredio(
    id_ficha,
    c_nomb_edificacion,
    cod_tipo_edificacion,
    cod_tipo_interior,
    n_num_interior,
    id_hab_urb,
    c_zse_hab_urb,
    c_manzana_hab_urb,
    c_lote_hab_urb,
    c_sublote_hab_urb,
    estpriedad,
    id_ubicacion
  ) {
    try {
      const [updatedRowsCount] = await UbicacionPredio.update(
        {
          id_ficha,
          c_nomb_edificacion,
          cod_tipo_edificacion,
          cod_tipo_interior,
          n_num_interior,
          id_hab_urb,
          c_zse_hab_urb,
          c_manzana_hab_urb,
          c_lote_hab_urb,
          c_sublote_hab_urb,
          estpriedad,
          id_ubicacion,
        },
        {
          where: {
            id_ubicacion: id_ubicacion,
          },
        }
      );
      return updatedRowsCount;
    } catch (error) {
      throw new Error("Error al actualizar la ubicación de predio.");
    }
  }

  async getAllMaestro() {
    try {
      const condNumeracion = await condNumeracionService.getAllCondNumeracion();
      const tipoEdificacion =
        await tipoEdificacionService.getAllTipoEdificaciones();
      const tipoInterior = await tipoInteriorService.getAllTipoInteriores();
      const tipoPuerta = await tipoPuertaService.getAllTipoPuertas();
      const spVias = await spViasService.getAllSpVias();
      const habUrbana = await habUrbanaService.getAllHabUrbana();
      return {
        data: {
          condNumeracion,
          tipoEdificacion,
          tipoInterior,
          tipoPuerta,
          spVias,
          habUrbana,
        },
      };
    } catch (error) {
      throw new Error("Error al obtener los maestros...." + error);
    }
  }

  async getUbiPredio(id_ficha) {
    try {
      const ubicacionPredioVia = await UbicacionPredioViaDetail.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      const ubicacionPredio = await UbicacionPredioDetail.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return {
        data: {
          ubicacionPredio,
          ubicacionPredioVia,
        },
      };
    } catch (error) {
      throw new Error("Error al obtener los maestros...." + error);
    }
  }
}
