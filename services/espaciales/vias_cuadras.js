import TipoVias from "../../models/maestros/general/tipoVias.js";
import { sequelize } from "../../config/postgres/sequelize.js";

export class ViasCuadrasService {
  async getTipoVias() {
    try {
      // const distrito = await SpDistrito.findAll();
      const dbResponse = await TipoVias.findAll();
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al obtener la extensión.");
    }
  }

  async getVias(req) {
    const { cod_tipo_via } = req.params;
    try {
      const dbResponse = await sequelize.query(
        `SELECT '('||c_cod_via||')'||' '||cod_tipo_via||' '||c_nomb_via as etiqueta, id_via,c_cod_via,cod_tipo_via,c_nomb_via FROM espaciales.sp_vias
            WHERE cod_tipo_via = '` +
          cod_tipo_via +
          `'`
      );
      return {
        status: "success",
        data: dbResponse[0],
      };
    } catch (error) {
      throw new Error("Error al obtener la extensión.");
    }
  }

  async getCuadras(req) {
    const { id_via } = req.params;
    try {
      const dbResponse = await sequelize.query(
        `select id_via,id_cuadra,(etiquetado||' '|| nro_cuadra) as etiquetado from espaciales.sp_cuadras
        where id_via = '` +
          id_via +
          `'`
      );
      return {
        status: "success",
        data: dbResponse[0],
      };
    } catch (error) {
      throw new Error("Error al obtener la extensión.");
    }
  }
}
