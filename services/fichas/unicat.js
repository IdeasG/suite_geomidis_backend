import { Op } from "sequelize";
import Unicat from "../../models/fichas/unicat.js";
import UnicatDetail from "../../models/fichas/unicatDetail.js";

export class UnicatService {
  async getUnicat(id_ficha) {
    try {
      const data = await Unicat.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getUnicatBySearch(search) {
    try {
      const data = await UnicatDetail.findAll({
        where: {
          [Op.or]: [
            {
              id_unicat: {
                [Op.iLike]: `${search}%`,
              },
            },
            {
              nro_ficha: search,
            },
            {
              persona: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              num_doc: search,
            },
          ],
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async addUnicat(
    c_cod_cuc,
    c_cod_cuc_2,
    c_ubigeo_dep,
    c_ubigeo_prov,
    c_ubigeo_dist,
    c_cod_sector,
    c_cod_mzna,
    id_lote,
    c_cod_lote,
    c_cod_edifica,
    c_cod_entrada,
    c_cod_piso,
    c_cod_unidad,
    c_cod_dc,
    c_cod_contri_rentas,
    c_cod_predial_rentas
  ) {
    try {
      let cadena =
        "" +
        c_ubigeo_dep +
        c_ubigeo_prov +
        c_ubigeo_dist +
        c_cod_sector +
        c_cod_mzna +
        c_cod_lote +
        c_cod_edifica +
        c_cod_entrada +
        c_cod_piso +
        c_cod_unidad;
      const sumaDigitos = cadena.split("").reduce((acumulador, digito) => {
        return acumulador + parseInt(digito, 10);
      }, 0);

      c_cod_dc = sumaDigitos % 9;

      const data = await Unicat.create({
        id_unicat: "" + cadena + c_cod_dc,
        id_edificacion: 0,
        id_lote,
        c_tipo_lote: "Urbana",
        c_cod_cuc: "" + c_cod_cuc + c_cod_cuc_2,
        c_ubigeo_dep,
        c_ubigeo_prov,
        c_ubigeo_dist,
        c_cod_sector,
        c_cod_mzna,
        c_cod_lote,
        c_cod_edifica,
        c_cod_entrada,
        c_cod_piso,
        c_cod_unidad,
        c_cod_dc,
        c_cod_contri_rentas,
        c_cod_predial_rentas,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el servicio.");
    }
  }

  async updateUnicat(id_ficha, c_observaciones, id_observaciones) {
    try {
      const [updatedRowsCount] = await Unicat.update(
        {
          id_ficha,
          c_observaciones,
        },
        {
          where: {
            id_observaciones: id_observaciones,
          },
        }
      );
      return updatedRowsCount;
    } catch (error) {
      throw new Error("Error al actualizar el servicio.");
    }
  }
}
