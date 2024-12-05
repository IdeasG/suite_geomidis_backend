import CapasMostrar from "../../models/manager/capasMostrar.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import Capas from "../../models/maestros/administracion/capas.js";
import CapasGrupo from "../../models/maestros/administracion/capasGrupo.js";
import CapasSuperGrupo from "../../models/maestros/administracion/capasSuperGrupo.js";
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
      const [results, metadata] = await sequelize.query(`
      select * from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'interno'
      order by sg.c_nombre_super_grupo asc`
      // limit `+ pageSize + ` offset ` + offset
      );
      const [resultsConteo, metadataConteo] = await sequelize.query(`
      select count(*) as conteo from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'interno'
      `);
      const totalItems = parseInt(resultsConteo[0].conteo)
      const totalPages = Math.ceil(totalItems / pageSize);
      const data = {
        data: results,
        currentPage:1,
        totalPages:1,
        totalItems:totalItems
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }

  async getAllCapasTableExterno(offset,pageSize,currentPage) {
    try {
      const [results, metadata] = await sequelize.query(`
      select * from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'externo'
      order by sg.c_nombre_super_grupo asc`
      // limit `+ pageSize + ` offset ` + offset
      );
      const [resultsConteo, metadataConteo] = await sequelize.query(`
      select count(*) as conteo from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'externo'
      `);
      const totalItems = parseInt(resultsConteo[0].conteo)
      const totalPages = Math.ceil(totalItems / pageSize);
      const data = {
        data: results,
        currentPage:1,
        totalPages:1,
        totalItems:totalItems
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
    }
  }
  async getAllTablasEspaciales() {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='espaciales'
        order by table_name asc
      `);
      return results;
    } catch (error) {
      throw new Error("Error al obtener los resultados..." + error);
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
      // console.log(response);
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
    b_geoportal
  ) {
    try {
      const response = await Capas.create({
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
        b_geoportal
      });
      return response;
    } catch (error) {
      throw new Error("Error al obtener las capas visibles con el id_capa:");
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
    c_sql_capa
  ) {
    try {
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
          c_sql_capa
        },
        { where: { id_capa } }
      );
      return response;
    } catch (error) {
      throw new Error("Error al actualizar capas");
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
      const [results, metadata] = await sequelize.query(`
        SELECT espaciales.${tabla}.*,cp.nombccpp,cp.area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar ${clasicacionCS} FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
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
         SELECT espaciales.${tabla}.*,cp.nombccpp,cp.area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar,
        CASE
          WHEN espaciales.${tabla}.distancia_km < ${distancia} THEN 'SI'
          ELSE 'NO'
        END AS cobertura,
        ROW_NUMBER() OVER(PARTITION BY espaciales.${tabla}.id_ccpp ORDER BY espaciales.${tabla}.distancia_km) AS contador
        FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
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
      const [results, metadata] = await sequelize.query(`
        select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp,cp.area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
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
      //   select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp,cp.area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital,cp.geom, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
      //   left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
      //   left join ${leftjoin}
      //   WHERE ${where}
      //   order by id_ccpp, distancia_km asc
      //   )
      //   as newTable
      //   order by distancia_km asc
      // `);
      const [results, metadata] = await sequelize.query(`
        select newTable.* from (SELECT DISTINCT ON (id_ccpp) id_ccpp as id_grupo, espaciales.${tabla}.*,cp.nombccpp,cp.area_17,cp.ubigeo,cp.coddpto,cp.codprov,cp.coddist,cp.codccpp,cp.nombdep,cp.nombprov,cp.nombdist,cp.capital,cp.geom, nomb.${nombEst} as nombre_lugar  FROM espaciales.${tabla}
        left join espaciales.sp_centros_poblados cp on espaciales.${tabla}.id_ccpp = cp.idccpp_21
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
      const [results2, metadata2] = await sequelize.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'espaciales' AND table_name = '${c_nombre_tabla_capa}'`);
      let nuevasColumnas = [];
      for (let index in results2) {
        const element = results2[index].column_name;
        if (element !== "geom" && element !== "CODOBJ" && element !== "gid" && element !== "ideasg") {
          const registrados = {
            c_campo_original: element,
            c_campo_alias: element,
            b_campo: false,
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
      const [results2, metadata2] = await sequelize.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'espaciales' AND table_name = '${c_nombre_tabla_capa}'`);
      let nuevasColumnas = [];
      for (let index in results2) {
        const element = results2[index].column_name;
        if (element !== "geom" && element !== "CODOBJ" && element !== "gid" && element !== "ideasg") {
          const registrados = {
            c_campo_original: element,
            c_campo_alias: element,
            b_campo: false,
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
}
