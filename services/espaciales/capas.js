import CapasMostrar from "../../models/manager/capasMostrar.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import Capas from "../../models/maestros/administracion/capas.js";
import CapasGrupo from "../../models/maestros/administracion/capasGrupo.js";
import CapasSuperGrupo from "../../models/maestros/administracion/capasSuperGrupo.js";
import CapasEstilos from "../../models/maestros/administracion/capasEstilos.js";
import Vistas from "../../models/manager/vistas.js";
import InformacionRegistro from "../../models/manager/informacionRegistros.js";
export class CapasService {
  async getAllCapasSuperGrupo() {
    try {
      const response = await CapasSuperGrupo.findAll();
      return response;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getPublicadosGeoportalIn() {
    try {
      const [data, metadata] = await sequelize.query(`
        select tcg.id_grupo, c_nombre_grupo, c_nombre_public_capa,c_workspace, c_nombre_geoserver, c_url, c_tipo
        from administracion.tadm_capas_grupo tcg
        left join administracion.tadm_capas tc on tcg.id_grupo = tc.id_grupo
        where b_geoportal = true
      `)

      const groupedData = data.reduce((acc, currentValue) => {
        if (currentValue.c_tipo === 'interno') {
            if (!acc.interno[currentValue.c_nombre_grupo]) {
                acc.interno[currentValue.c_nombre_grupo] = [];
            }
            acc.interno[currentValue.c_nombre_grupo].push(currentValue);
        } else if (currentValue.c_tipo === 'externo') {
            if (!acc.externo[currentValue.c_nombre_grupo]) {
                acc.externo[currentValue.c_nombre_grupo] = [];
            }
            acc.externo[currentValue.c_nombre_grupo].push(currentValue);
        }
        return acc;
      }, { interno: {}, externo: {} });

      const interno = groupedData.interno;
      const externo = groupedData.externo;
      const response = { interno, externo }
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getAllCapasTable(offset,pageSize,currentPage) {
    try {
      // Obtener capas con información básica
      const [results, metadata] = await sequelize.query(`
        select c.*, sg.c_nombre_super_grupo, g.c_nombre_grupo
        from administracion.tadm_capas c
        left join administracion.tadm_capas_grupo g on c.id_grupo = g.id_grupo
        left join administracion.tadm_capas_supergrupo sg on g.id_super_grupo = sg.id_super_grupo
        where c.c_tipo = 'interno'
        order by sg.c_nombre_super_grupo asc, g.c_nombre_grupo asc, c.c_nombre_public_capa asc
      `);

      // Obtener todos los estilos de las capas
      const [estilosResults, estilosMetadata] = await sequelize.query(`
        select id_capa, c_estilo
        from administracion.tadm_capas_estilos
        where id_capa IN (${results.map(r => r.id_capa).join(',') || '0'})
        order by id_capa, id
      `);

      // Agrupar estilos por capa
      const estilosPorCapa = {};
      estilosResults.forEach(estilo => {
        if (!estilosPorCapa[estilo.id_capa]) {
          estilosPorCapa[estilo.id_capa] = [];
        }
        estilosPorCapa[estilo.id_capa].push(estilo.c_estilo);
      });

      // Combinar datos de capas con sus estilos
      const transformedData = results.map(capa => ({
        ...capa,
        estilos: estilosPorCapa[capa.id_capa] || []
      }));

      // Contar total de registros
      const [resultsConteo, metadataConteo] = await sequelize.query(`
        select count(*) as conteo 
        from administracion.tadm_capas c
        left join administracion.tadm_capas_grupo g on c.id_grupo = g.id_grupo
        left join administracion.tadm_capas_supergrupo sg on g.id_super_grupo = sg.id_super_grupo
        where c.c_tipo = 'interno'
      `);

      const totalItems = parseInt(resultsConteo[0].conteo);
      const totalPages = Math.ceil(totalItems / pageSize);
      
      const data = {
        data: transformedData,
        currentPage: 1,
        totalPages: 1,
        totalItems: totalItems
      };
      
      return data;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async getAllCapasTableExterno(offset,pageSize,currentPage) {
    try {
      // Obtener capas externas con información básica
      const [results, metadata] = await sequelize.query(`
        select c.*, sg.c_nombre_super_grupo, g.c_nombre_grupo
        from administracion.tadm_capas c
        left join administracion.tadm_capas_grupo g on c.id_grupo = g.id_grupo
        left join administracion.tadm_capas_supergrupo sg on g.id_super_grupo = sg.id_super_grupo
        where c.c_tipo = 'externo'
        order by sg.c_nombre_super_grupo asc, g.c_nombre_grupo asc, c.c_nombre_public_capa asc
      `);

      // Obtener todos los estilos de las capas externas
      const [estilosResults, estilosMetadata] = await sequelize.query(`
        select id_capa, c_estilo
        from administracion.tadm_capas_estilos
        where id_capa IN (${results.map(r => r.id_capa).join(',') || '0'})
        order by id_capa, id
      `);

      // Agrupar estilos por capa
      const estilosPorCapa = {};
      estilosResults.forEach(estilo => {
        if (!estilosPorCapa[estilo.id_capa]) {
          estilosPorCapa[estilo.id_capa] = [];
        }
        estilosPorCapa[estilo.id_capa].push(estilo.c_estilo);
      });

      // Combinar datos de capas con sus estilos
      const transformedData = results.map(capa => ({
        ...capa,
        estilos: estilosPorCapa[capa.id_capa] || []
      }));

      // Contar total de registros
      const [resultsConteo, metadataConteo] = await sequelize.query(`
        select count(*) as conteo 
        from administracion.tadm_capas c
        left join administracion.tadm_capas_grupo g on c.id_grupo = g.id_grupo
        left join administracion.tadm_capas_supergrupo sg on g.id_super_grupo = sg.id_super_grupo
        where c.c_tipo = 'externo'
      `);

      const totalItems = parseInt(resultsConteo[0].conteo);
      const totalPages = Math.ceil(totalItems / pageSize);
      
      const data = {
        data: transformedData,
        currentPage: 1,
        totalPages: 1,
        totalItems: totalItems
      };
      
      return data;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }
  async getAllEsquemas() {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
        ORDER BY schema_name ASC
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los esquemas..." + error);
    }
  }

  async getAllTablasEspaciales(esquema) {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='${esquema}'
        ORDER BY table_name ASC
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener las tablas del esquema..." + error);
    }
  }
  async getAllCapasGrupos() {
    try {
      const response = await CapasGrupo.findAll();
      return response;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getAllCapas() {
    try {
      const response = await Capas.findAll();
      return response;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getAllCapasInternas(id_rol) {
    try {
      let responseData
      if (id_rol != "0") {
        // cambiar consulta a sequellize, se requeire conexion con el rol
        const [response, metadata] = await sequelize.query(`select * from administracion.tadm_capas tc
        left join administracion.rol_capas rc on tc.id_capa = rc.fk_capa
        where fk_rol = ` + id_rol + ` and c_tipo = 'interno'
        order by c_nombre_public_capa asc`);
        responseData = response
      } else {
        const [response, metadata] = await sequelize.query(`select * from administracion.tadm_capas where c_tipo = 'interno' order by c_nombre_public_capa asc;`);
        responseData = response
      }
      return responseData;
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getVistas() {
    try {
      const response = await Vistas.findAll();
      return response;
    } catch (error) {
      throw new Error("Error al obtener las vistas.");
    }
  }

  async deleteVistas(id_vistas) {
    try {
      const response = await Vistas.destroy({ where: { id_vistas } });
      return response;
    } catch (error) {
      throw new Error("Error al obtener las vistas.");
    }
  }

  async postVistas(c_extent, c_capas, c_mapa_base, c_nombre) {
    try {
      const response = await Vistas.create({
        c_extent,
        c_capas,
        c_mapa_base,
        c_nombre,
      });
      return response;
    } catch (error) {
      throw new Error("Error al registar la nueva vista.");
    }
  }

  async getCapasVisibles(id_capa,id_rol) {
    try {
      const response = await CapasMostrar.findAll({ where: { id_capa, id_rol } });
      
      // Si existe respuesta, obtener información de la tabla y tipos de datos
      if (response && response.length > 0) {
        // Obtener información de la capa para conocer la tabla
        const [capaInfo] = await sequelize.query(`
          select c_nombre_tabla_capa, c_nombre_esquema from administracion.tadm_capas 
          where id_capa = ${id_capa}
        `);

        if (capaInfo && capaInfo.length > 0) {
          const nombreTabla = capaInfo[0].c_nombre_tabla_capa;
          const esquema = capaInfo[0].c_nombre_esquema || 'espaciales';

          // Obtener tipos de datos de los campos
          const [tiposCampos] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns
            WHERE table_name = '${nombreTabla}' AND table_schema = '${esquema}'
          `);

          // Crear un mapa de tipos de datos por nombre de campo
          const tiposPorCampo = {};
          tiposCampos.forEach(campo => {
            tiposPorCampo[campo.column_name] = campo.data_type;
          });

          // Agregar tipo de dato a cada campo en c_array_campos
          const responseConTipos = response.map(item => {
            const itemData = item.toJSON ? item.toJSON() : item;
            const camposConTipos = itemData.c_array_campos.map(campo => ({
              ...campo,
              c_tipo_dato: tiposPorCampo[campo.c_campo_original] || 'unknown'
            }));

            return {
              ...itemData,
              c_array_campos: camposConTipos
            };
          });

          console.log(responseConTipos);
          return responseConTipos;
        }
      }

      console.log(response);
      return response;
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  async getCapasVisiblesInvitado(id_capa,id_cliente) {
    try {
      const [response, metadata] = await sequelize.query(`
        select cm.* from administracion.tadm_capas_campos_mostrar cm
        left join seguridad.tseg_roles tr on cm.id_rol = tr.id_rol
        where tr.id_cliente = `+ id_cliente +` and tr.c_nombre_rol ilike '%invitado%' and id_capa = `+ id_capa +`;
      `);

      // Si existe respuesta, obtener información de la tabla y tipos de datos
      if (response && response.length > 0) {
        // Obtener información de la capa para conocer la tabla
        const [capaInfo] = await sequelize.query(`
          select c_nombre_tabla_capa, c_nombre_esquema from administracion.tadm_capas 
          where id_capa = ${id_capa}
        `);

        if (capaInfo && capaInfo.length > 0) {
          const nombreTabla = capaInfo[0].c_nombre_tabla_capa;
          const esquema = capaInfo[0].c_nombre_esquema || 'espaciales';

          // Obtener tipos de datos de los campos
          const [tiposCampos] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns
            WHERE table_name = '${nombreTabla}' AND table_schema = '${esquema}'
          `);

          // Crear un mapa de tipos de datos por nombre de campo
          const tiposPorCampo = {};
          tiposCampos.forEach(campo => {
            tiposPorCampo[campo.column_name] = campo.data_type;
          });

          // Agregar tipo de dato a cada campo en c_array_campos
          const responseConTipos = response.map(item => {
            const camposConTipos = item.c_array_campos.map(campo => ({
              ...campo,
              c_tipo_dato: tiposPorCampo[campo.c_campo_original] || 'unknown'
            }));

            return {
              ...item,
              c_array_campos: camposConTipos
            };
          });

          return responseConTipos;
        }
      }

      return response;
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  async RegistrarCapas(
    id_grupo,
    c_nombre_tabla_capa,
    c_nombre_public_capa,
    c_nombre_geoserver,
    c_workspace,
    c_sql_capa,
    b_capa,
    c_tipo,
    c_url,
    c_servicio,
    id_usuario_auditoria,
    id_rol_auditoria,
    c_url_seleccionado,
    b_geoportal,
    c_nombre_esquema,
    estilos = []
  ) {
    const transaction = await sequelize.transaction();
    try {
      // Registrar la capa
      const capa = await Capas.create({
        id_grupo,
        c_nombre_tabla_capa,
        c_nombre_public_capa,
        c_nombre_geoserver,
        c_workspace,
        c_sql_capa,
        b_capa,
        c_tipo,
        c_url,
        c_servicio,
        id_usuario_auditoria,
        id_rol_auditoria,
        c_url_seleccionado,
        b_geoportal,
        c_nombre_esquema
      }, { transaction });

      // Registrar los estilos si existen
      if (estilos && estilos.length > 0) {
        const estilosData = estilos.map(estilo => ({
          id_capa: capa.id_capa,
          c_estilo: estilo
        }));

        await CapasEstilos.bulkCreate(estilosData, { transaction });
      }

      await transaction.commit();
      return capa;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error al registrar la capa y sus estilos: " + error.message);
    }
  }

  async RegistrarGrupos(id_super_grupo, c_nombre_grupo, b_grupo) {
    try {
      const response = await CapasGrupo.create({
        id_super_grupo,
        c_nombre_grupo,
        b_grupo,
      });
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async RegistrarSupergrupos(c_nombre_super_grupo, b_super_grupo) {
    try {
      const response = await CapasSuperGrupo.create({
        c_nombre_super_grupo,
        b_super_grupo,
      });
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
    }
  }

  async ActualizarCapas(
    id_capa,
    id_grupo,
    c_nombre_tabla_capa,
    c_nombre_public_capa,
    c_nombre_geoserver,
    c_workspace,
    b_geoportal,
    b_capa,
    c_tipo,
    c_url,
    c_servicio,
    id_usuario_auditoria,
    id_rol_auditoria,
    c_url_seleccionado,
    c_sql_capa,
    c_nombre_esquema,
    estilos = []
  ) {
    const transaction = await sequelize.transaction();
    try {
      // Actualizar la capa
      const response = await Capas.update(
        {
          id_grupo,
          c_nombre_tabla_capa,
          c_nombre_public_capa,
          c_nombre_geoserver,
          c_workspace,
          b_geoportal,
          b_capa,
          c_tipo,
          c_url,
          c_servicio,
          id_usuario_auditoria,
          id_rol_auditoria,
          c_url_seleccionado,
          c_sql_capa,
          c_nombre_esquema
        },
        { where: { id_capa }, transaction }
      );

      // Eliminar estilos anteriores
      await CapasEstilos.destroy({
        where: { id_capa },
        transaction
      });

      // Registrar los nuevos estilos si existen
      if (estilos && estilos.length > 0) {
        const estilosData = estilos.map(estilo => ({
          id_capa: id_capa,
          c_estilo: estilo
        }));

        await CapasEstilos.bulkCreate(estilosData, { transaction });
      }

      await transaction.commit();
      return response;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error al actualizar la capa y sus estilos: " + error.message);
    }
  }

  async ActualizarGrupos(id_grupo, id_super_grupo, c_nombre_grupo, b_grupo) {
    try {
      const response = await CapasGrupo.update(
        { id_super_grupo, c_nombre_grupo, b_grupo },
        { where: { id_grupo } }
      );
      return response;
    } catch (error) {
      throw new Error("Error al actualizar grupos");
    }
  }

  async ActualizarSupergrupos(
    id_super_grupo,
    c_nombre_super_grupo,
    b_super_grupo
  ) {
    // console.log('hola');
    try {
      const response = await CapasSuperGrupo.update(
        { c_nombre_super_grupo, b_super_grupo },
        { where: { id_super_grupo } }
      );
      return response;
    } catch (error) {
      throw new Error("Error al actualizar super grupos");
    }
  }

  async EliminarCapas(id_capa,id_usuario_auditoria,id_rol_auditoria) {
    try {
      await Capas.update(
        {
          id_usuario_auditoria,
          id_rol_auditoria
        },
        { where: { id_capa } }
      );
      const response = await Capas.destroy({ where: { id_capa } });
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error al actualizar capas");
    }
  }

  async EliminarGrupos(id_grupo) {
    try {
      const response = await CapasGrupo.destroy({ where: { id_grupo } });
      return response;
    } catch (error) {
      throw new Error("Error al actualizar grupos");
    }
  }

  async EliminarSupergrupos(id_super_grupo) {
    // console.log('hola');
    try {
      const response = await CapasSuperGrupo.destroy({
        where: { id_super_grupo },
      });
      return response;
    } catch (error) {
      throw new Error("Error al eliminar super grupos: "+error);
    }
  }

  async putCapasVisibles(id, c_array_campos) {
    try {
      await CapasMostrar.update(
        { c_array_campos },
        { where: { id } }
      );
      return;
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  async cruceInformacion(body,tipo,busqueda,offset,pageSize) {
    try {
      let resultado = {}
      let consulta = ''
      if (tipo == '1') {
        if (body['0'].campo == "IDCCPP") {
          for (let index in body) {
            const element = body[index];
            // console.log(element, index);
            if (index == '0') {
              consulta = consulta + 'select  espaciales.sp_centros_poblados.nombccpp, espaciales.' + element.value +'."'+element.campo+ '", count(*) as cantidad from espaciales.' + element.value + ' '
              // console.log(consulta);
            }
            else {
              consulta = consulta + 'inner join espaciales.' + element.value + ' on espaciales.' + body[parseInt(index)-1].value + '."'+body[parseInt(index)-1].campo+'"::character varying = espaciales.' + element.value + '."'+ element.campo+'"::character varying '
              // console.log(consulta);
            }
          }
          // console.log(body['0'].value);
          consulta = consulta + 'left join  espaciales.sp_centros_poblados on espaciales.sp_centros_poblados.idccpp_21 = '+ 'espaciales.' + body['0'].value+'."'+body['0'].campo+'" group by espaciales.' + body['0'].value+'."'+body['0'].campo+'", espaciales.sp_centros_poblados.nombccpp' 
        } else {
          for (let index in body) {
            const element = body[index];
            // console.log(element, index);
            if (index == '0') {
              consulta = consulta + 'select  espaciales.' + element.value +'."'+element.campo+ '", count(*) as cantidad from espaciales.' + element.value + ' '
              // console.log(consulta);
            }
            else {
              consulta = consulta + 'inner join espaciales.' + element.value + ' on espaciales.' + body[parseInt(index)-1].value + '."'+body[parseInt(index)-1].campo+'"::character varying = espaciales.' + element.value + '."'+ element.campo+'"::character varying '
              // console.log(consulta);
            }
          }
          consulta = consulta + 'group by espaciales.' + body['0'].value+'."'+body['0'].campo+'"' 
        }
        // consulta = consulta + ' offset ' + offset + ' limit ' + pageSize
        // console.log(consulta);
        const [results, metadata] = await sequelize.query(consulta);
        const respuetaProcesada = {
          'consulta_grupal': results
        }
        resultado = respuetaProcesada
      } else {
        for (let index in body) {
          const element = body[index];
          const query = 'select espaciales.' + element.value +'."'+element.campo+ '" from espaciales.' + element.value + ' where espaciales.' + element.value + '."' + element.campo + '"::character varying = ' + busqueda + '::character varying'
          console.log(query);
          const [results, metadata] = await sequelize.query(query);
          console.log(results);
          resultado[element.value] = results
        }
      }
      return resultado;
    } catch (error) {
      throw new Error("Error al obtener el json:" + error);
    }
  }

  async validacionData() {
    try {
      const response = await InformacionRegistro.findAll({
        attributes: [
          "id",
          "c_programa",
          "a_conteo_registros_fallidos",
          "c_capa",
          "d_registro",
        ],
        order: [["d_registro", "DESC"]],
        raw: true,
      });
      // Formatear el campo 'd_registro' en cada registro
      const registrosFormateados = response.map((registro) => {
        const fecha = new Date(registro.d_registro);
        const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
        
        return {
          ...registro,
          d_registro: fechaFormateada,
        };
      });
      return registrosFormateados;
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  async jsonFallido(id) {
    try {
      const response = await InformacionRegistro.findAll({
        attributes: [
          "id",
          "c_programa",
          "c_capa",
          "d_registro",
          "a_registros_fallidos",
        ],
        order: [["d_registro", "DESC"]],
        raw: true,
        where: { id: id },
      });
      // Formatear el campo 'd_registro' en cada registro
      const registrosFormateados = response.map((registro) => {
        const fecha = new Date(registro.d_registro);
        const fechaFormateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
        
        return {
          ...registro,
          d_registro: fechaFormateada,
        };
      });
      return registrosFormateados;
    } catch (error) {
      throw new Error("Error al obtener el json:" + error);
    }
  }

  async filtroServicios(tabla, where, leftjoin, nombEst,clasicacionCS) {
    try {
      // left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = cp.cod_ccpp
      const [results, metadata] = await sequelize.query(`
        SELECT espaciales.${tabla}.*,cp.nombccpp,pobl.area as area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar ${clasicacionCS} FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
        left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = pobl.cod_ccpp
        left join ${leftjoin}
        WHERE ${where}
        order by distancia_km asc
      `);
      // console.log(results);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async sumaCCPPPob(array) {
    try {
      const result = array.map(item => `'${item}'`).join(', ');
      const [results, metadata] = await sequelize.query(`
        select CAST(SUM(pobtot17) AS INTEGER) as suma from espaciales.sp_centros_poblados
        where idccpp_21 in (${result});
      `);
      return results[0].suma;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroServiciosAreaExcel(tabla, where, leftjoin, nombEst,distancia) {
    try {
      const [results, metadata] = await sequelize.query(`
         SELECT espaciales.${tabla}.*,cp.nombccpp,pobl.area as area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar,
        CASE
          WHEN espaciales.${tabla}.distancia_km < ${distancia} THEN 'SI'
          ELSE 'NO'
        END AS cobertura,
        ROW_NUMBER() OVER(PARTITION BY espaciales.${tabla}.id_ccpp ORDER BY espaciales.${tabla}.distancia_km) AS contador
        FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
        left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = pobl.cod_ccpp
        left join ${leftjoin}
        WHERE ${where}
        order by id_ccpp, distancia_km asc
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroServiciosArea(tabla, where, leftjoin, nombEst) {
    try {
      console.log();
      
      const [results, metadata] = await sequelize.query(`
        select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp, pobl.area as area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
        left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = pobl.cod_ccpp
        left join ${leftjoin}
        WHERE ${where}
        order by id_ccpp, distancia_km asc
        )
        as newTable
        order by distancia_km asc
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroServiciosAreaNoCob(tabla, where, leftjoin, nombEst) {
    try {
      // console.log(`
      //   select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp,pobl.area as area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital,cp.geom, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
      //   left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
      //   left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = pobl.cod_ccpp
      //   left join ${leftjoin}
      //   WHERE ${where}
      //   order by id_ccpp, distancia_km asc
      //   )
      //   as newTable
      //   order by distancia_km asc
      // `);
      
      const [results, metadata] = await sequelize.query(`
        select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp,pobl.area as area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital,cp.geom, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
        left join espaciales.poblaciones pobl on espaciales.${tabla}.id_ccpp = pobl.cod_ccpp
        left join ${leftjoin}
        WHERE ${where}
        order by id_ccpp, distancia_km asc
        )
        as newTable
        order by distancia_km asc
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroAfiliados(idccpp) {
    try {
      const [results, metadata] = await sequelize.query(`
        select * from espaciales.sp_ccpp_pt
        where codccpp ='${idccpp}'
        ;
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroAfiliadosArea(idccpp) {
    try {
      // console.log(`
      //   select sum(usuar_p65) as usuar_p65,sum(usuacontig) as usuacontig,sum(saf_cuna) as saf_cuna,sum(afilijunto) as afilijunto from espaciales.sp_ccpp_pt
      //   where codccpp in (${idccpp})
      // `);
      const [results, metadata] = await sequelize.query(`
        select sum(usuar_p65) as usuar_p65,sum(usuacontig) as usuacontig,sum(saf_cuna) as saf_cuna,sum(afilijunto) as afilijunto from espaciales.sp_ccpp_pt
        where codccpp in (${idccpp})
        ;
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async filtroCCPPDatosGeneralArea(idccpp) {
    try {
      const [results, metadata] = await sequelize.query(`
        select sum(usuar_p65) as usuar_p65,sum(usuacontig) as usuacontig,sum(saf_cuna) as saf_cuna,sum(afilijunto) as afilijunto from espaciales.sp_ccpp_pt
        where codccpp in (${idccpp})
        ;
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async busquedaAvanzada(simbolo, column, layer, inputBt) {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT * FROM espaciales.${layer}
        WHERE ${column} ${simbolo} ${inputBt}
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async postCapasVisibles(id_capa,id_rol) {
    try {
      const [results, metadata] = await sequelize.query(
        `select * from administracion.tadm_capas where id_capa = ${id_capa}`
      );
      const c_nombre_tabla_capa = results[0].c_nombre_tabla_capa;
      const c_nombre_esquema = results[0].c_nombre_esquema || 'espaciales';
      
      const [results2, metadata2] = await sequelize.query(`
      SELECT column_name, data_type FROM information_schema.columns
      WHERE table_schema = '${c_nombre_esquema}' AND table_name = '${c_nombre_tabla_capa}'`);
      
      let nuevasColumnas = [];
      for (let index in results2) {
        const element = results2[index];
        if (element.column_name !== "geom" && element.column_name !== "CODOBJ" && element.column_name !== "gid" && element.column_name !== "ideasg") {
          const registrados = {
            c_campo_original: element.column_name,
            c_campo_alias: element.column_name,
            b_campo: false,
            c_tipo_dato: element.data_type
          }
          nuevasColumnas.push(registrados);
        }
      }
      // nuevasColumnas = JSON.stringify(nuevasColumnas)
      const registrado = await CapasMostrar.create({
        id_capa,
        c_array_campos:nuevasColumnas,
        id_rol
      })
      return [registrado];
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  async postCapasVisiblesInvitado(id_capa,id_cliente) {
    try {
      const [results, metadata] = await sequelize.query(
        `select * from administracion.tadm_capas where id_capa = ${id_capa}`
      );
      const c_nombre_tabla_capa = results[0].c_nombre_tabla_capa;
      const c_nombre_esquema = results[0].c_nombre_esquema || 'espaciales';
      
      const [results2, metadata2] = await sequelize.query(`
      SELECT column_name, data_type FROM information_schema.columns
      WHERE table_schema = '${c_nombre_esquema}' AND table_name = '${c_nombre_tabla_capa}'`);
      
      let nuevasColumnas = [];
      for (let index in results2) {
        const element = results2[index];
        if (element.column_name !== "geom" && element.column_name !== "CODOBJ" && element.column_name !== "gid" && element.column_name !== "ideasg") {
          const registrados = {
            c_campo_original: element.column_name,
            c_campo_alias: element.column_name,
            b_campo: false,
            c_tipo_dato: element.data_type
          }
          nuevasColumnas.push(registrados);
        }
      }
      // nuevasColumnas = JSON.stringify(nuevasColumnas)
      const [response, metadata3] = await sequelize.query(`
        select * from seguridad.tseg_roles
        where id_cliente = `+ id_cliente +` and c_nombre_rol ilike '%invitado%';
      `);
      const id_rol = response[0].id_rol
      const registrado = await CapasMostrar.create({
        id_capa,
        c_array_campos:nuevasColumnas,
        id_rol
      })
      return [registrado];
    } catch (error) {
      throw new Error(
        "Error al obtener las capas visibles con el id_capa:" + id_capa + error
      );
    }
  }

  // ===== MÉTODOS PARA VISTAS =====
  
  async getVistasByUsuario(id_usuario) {
    try {
      const response = await Vistas.findAll({
        where: { id_usuario: id_usuario },
        order: [['id_vistas', 'DESC']]
      });
      return response;
    } catch (error) {
      throw new Error("Error al obtener las vistas del usuario: " + error);
    }
  }

  async createVista(vistaData) {
    try {
      const response = await Vistas.create(vistaData);
      return response;
    } catch (error) {
      throw new Error("Error al crear la vista: " + error);
    }
  }

  async deleteVista(id_vista, id_usuario) {
    try {
      // Verificar que la vista pertenezca al usuario antes de eliminar
      const vista = await Vistas.findOne({
        where: { 
          id_vistas: id_vista,
          id_usuario: id_usuario 
        }
      });
      
      if (!vista) {
        throw new Error("Vista no encontrada o no pertenece al usuario");
      }
      
      const response = await Vistas.destroy({
        where: { 
          id_vistas: id_vista,
          id_usuario: id_usuario 
        }
      });
      
      return response;
    } catch (error) {
      throw new Error("Error al eliminar la vista: " + error);
    }
  }
}
