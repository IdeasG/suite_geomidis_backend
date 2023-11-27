import CapasMostrar from "../../models/manager/capasMostrar.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import Capas from '../../models/maestros/administracion/capas.js';
import CapasGrupo from '../../models/maestros/administracion/capasGrupo.js';
import CapasSuperGrupo from '../../models/maestros/administracion/capasSuperGrupo.js';


export class CapasService {
  async getAllCapasSuperGrupo() {
    try {
      const response = await CapasSuperGrupo.findAll();
      return response;
    } catch (error) {
    throw new Error('Error al obtener los tipos de vía....'+ error);
    }
  }

  async getAllTablasEspaciales() {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='espaciales'
      `)
      return results;
    } catch {

    }
  }
  async getAllCapasGrupos() {
    try {
      const response = await CapasGrupo.findAll();
      return response;
    } catch (error) {
    throw new Error('Error al obtener los tipos de vía....'+ error);
    }
  }

  async getAllCapas() {
    try {
      const response = await Capas.findAll()
      return response;
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

  async RegistrarCapas(id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa) {
    try {
      const response = await Capas.create({id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async RegistrarGrupos(id_super_grupo, c_nombre_grupo, b_grupo) {
    try {
      const response = await CapasGrupo.create({id_super_grupo, c_nombre_grupo, b_grupo})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async RegistrarSupergrupos(c_nombre_super_grupo, b_super_grupo) {
    console.log('hola');
    try {
      const response = await CapasSuperGrupo.create({c_nombre_super_grupo, b_super_grupo})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async ActualizarCapas(id_capa, id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa) {
    try {
      console.log(id_capa, id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa);
      const response = await Capas.update({id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa}, {where:{id_capa}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar capas");
    }
  }

  async ActualizarGrupos(id_grupo, id_super_grupo, c_nombre_grupo, b_grupo) {
    try {
      const response = await CapasGrupo.create({id_super_grupo, c_nombre_grupo, b_grupo}, {where:{id_grupo}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar grupos");
    }
  }

  async ActualizarSupergrupos(id_super_grupo, c_nombre_super_grupo, b_super_grupo) {
    console.log('hola');
    try {
      const response = await CapasSuperGrupo.create({c_nombre_super_grupo, b_super_grupo}, {where:{id_super_grupo}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar super grupos");
    }
  }

  async EliminarCapas(id_capa) {
    try {
      const response = await Capas.destroy({where:{id_capa}})
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error al actualizar capas");
    }
  }

  async EliminarGrupos(id_grupo) {
    try {
      const response = await CapasGrupo.destroy({where:{id_grupo}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar grupos");
    }
  }

  async EliminarSupergrupos(id_super_grupo) {
    console.log('hola');
    try {
      const response = await CapasSuperGrupo.destroy({where:{id_super_grupo}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar super grupos");
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
