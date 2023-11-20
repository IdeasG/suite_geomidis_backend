import TipoVia from "../../models/maestros/general/tipoVias.js";
import CapasMostrar from "../../models/manager/capasMostrar.js";
import { sequelize } from "../../config/postgres/sequelize.js";

export class CapasService {
  async createTipoVia(codTipoVia, nombTipoVia) {
    try {
      const tipoVia = await TipoVia.create({
        cod_tipo_via: codTipoVia,
        nomb_tipo_via: nombTipoVia,
      });
      return tipoVia;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async getAllCapas(pageNumber, pageSize) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const tipoVias = await sequelize.query(
        "select * from administracion.tadm_capas_supergrupo"
      );
      const totalItems = tipoVias.count;
      const totalPages = Math.ceil(totalItems / pageSize);
      return {
        items: tipoVias.rows,
        currentPage: parseInt(pageNumber),
        totalPages,
        totalItems,
      };
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getCapasVisibles(id_capa) {
    try {
      const response = await CapasMostrar.findAll({where:{id_capa}})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:" + id_capa + error);
    }
  }

  async putCapasVisibles(id,c_campo_alias,b_campo) {
    try {
      await CapasMostrar.update({c_campo_alias,b_campo},{where:{id}})
      return;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:" + id_capa + error);
    }
  }

  async postCapasVisibles(id_capa) {
    try {
      const [results, metadata] = await sequelize.query(`select * from administracion.tadm_capas where id_capa = ${id_capa}`)
      const c_nombre_tabla_capa = results[0].c_nombre_tabla_capa
      const [results2, metadata2] = await sequelize.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'espaciales' AND table_name = '${c_nombre_tabla_capa}'`)
      let nuevasColumnas = []
      for (let index in results2) {
        const element = results2[index].column_name;
        if (element !== 'IDEASG') {
          const registrados = await CapasMostrar.create({id_capa,c_campo_original:element,c_campo_alias:element,b_campo:false})
          nuevasColumnas.push(registrados)
        }
      }
      return nuevasColumnas;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:" + id_capa + error);
    }
  }
}
