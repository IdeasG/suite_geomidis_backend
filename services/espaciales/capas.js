import CapasMostrar from "../../models/manager/capasMostrar.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import Capas from '../../models/maestros/administracion/capas.js';
import CapasGrupo from '../../models/maestros/administracion/capasGrupo.js';
import CapasSuperGrupo from '../../models/maestros/administracion/capasSuperGrupo.js';
import Vistas from "../../models/manager/vistas.js";
import InformacionRegistro from "../../models/manager/informacionRegistros.js";
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
      throw new Error('Error al obtener los resultados...'+ error);
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

  async getAllCapasInternas() {
    try {
      const response = await Capas.findAll({where:{c_tipo: 'interno'}})
      return response;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getVistas() {
    try {
      const response = await Vistas.findAll()
      return response;
    } catch (error) {
      throw new Error("Error al obtener las vistas.");
    }
  }

  async deleteVistas(id_vistas) {
    try {
      const response = await Vistas.destroy({where:{id_vistas}})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las vistas.");
    }
  }

  async postVistas(c_extent,c_capas,c_mapa_base,c_nombre) {
    try {
      const response = await Vistas.create({c_extent,c_capas,c_mapa_base,c_nombre})
      return response;
    } catch (error) {
      throw new Error("Error al registar la nueva vista.");
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

  async RegistrarCapas(id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa, c_tipo, c_url, c_servicio) {
    try {
      // console.log(id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa, c_tipo, c_url);
      const response = await Capas.create({id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa, c_tipo, c_url, c_servicio})
      // console.log(response);
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
    // console.log('hola');
    try {
      const response = await CapasSuperGrupo.create({c_nombre_super_grupo, b_super_grupo})
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async ActualizarCapas(id_capa, id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, b_capa, c_tipo, c_url, c_servicio) {
    try {
      const response = await Capas.update({id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa:'1', b_capa, c_tipo, c_url, c_servicio}, {where:{id_capa}})
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
    // console.log('hola');
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
      // console.log(response);
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
    // console.log('hola');
    try {
      const response = await CapasSuperGrupo.destroy({where:{id_super_grupo}})
      return response;
    } catch (error) {
      throw new Error("Error al actualizar super grupos");
    }
  }

  async putCapasVisibles(campos) {
    try {
      for (let index in campos) {
        const element = campos[index];
        await CapasMostrar.update({c_campo_alias:element.c_campo_alias,b_campo:element.b_campo},{where:{id:element.id}})
      }
      return;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:" + id_capa + error);
    }
  }

  async validacionData() {
    try {
      const response = await InformacionRegistro.findAll({
        attributes: ['id', 'c_programa', 'c_capa', 'd_registro'],
        order: [['d_registro','DESC']],
        raw: true })
      // Formatear el campo 'd_registro' en cada registro
      const registrosFormateados = response.map(registro => ({
        ...registro,
        d_registro: registro.d_registro.toISOString().split('T')[0],
      }));
      return registrosFormateados;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:" + id_capa + error);
    }
  }

  async jsonFallido(id) {
    try {
      const response = await InformacionRegistro.findAll({
        attributes: ['id', 'c_programa', 'c_capa', 'd_registro', 'a_registros_fallidos'],
        order: [['d_registro','DESC']],
        raw: true,
        where: {id:id}
      })
      // Formatear el campo 'd_registro' en cada registro
      const registrosFormateados = response.map(registro => ({
        ...registro,
        d_registro: registro.d_registro.toISOString().split('T')[0],
      }));
      return registrosFormateados;
    } catch (error) {
      throw new Error("Error al obtener el json:" + error);
    }
  }

  async busquedaAvanzada(simbolo, column, layer, inputBt) {
    try {
      // console.log(`
      //   SELECT * FROM espaciales.${layer}
      //   WHERE ${column} ${simbolo} ${inputBt}
      // `);
      const [results, metadata] = await sequelize.query(`
        SELECT * FROM espaciales.${layer}
        WHERE ${column} ${simbolo} ${inputBt}
      `)
      return results;
    } catch {
      throw new Error('Error al obtener los resultados...'+ error);
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
