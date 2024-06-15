import "dotenv/config";

import { validatePagination } from "../../schemas/generales/pagination.js";

import { CapasService } from "../../services/espaciales/capas.js";

import { redisClient } from "../../config/redis/redis.js";

import { sequelize } from "../../config/postgres/sequelize.js";
import excel from "exceljs/dist/es5/index.js";
import zip from "shp-write/src/zip.js";
import axios from "axios";
import TgUsuario from "../../models/security/tgUsuario.js";
import { Sequelize } from "sequelize";
import Rol from "../../models/security/rol.js";
import fs from "fs";

const capasService = new CapasService();

export class CapasController {
  constructor() {}

  async getPublicadosGeoportal(req, res) {
    try {
      const response = await capasService.getPublicadosGeoportalIn()
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasTable(req, res) {
    const { page = 1, pageSize = 5 } = req.query;
    try {
      const offset = (page - 1) * pageSize;
      const response = await capasService.getAllCapasTable(offset, pageSize,page)
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasTableExterno(req, res) {
    const { page = 1, pageSize = 5 } = req.query;
    try {
      const offset = (page - 1) * pageSize;
      const response = await capasService.getAllCapasTableExterno(offset, pageSize,page)
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAtributos(req, res) {
    const { tabla } = req.params;
    try {
      const [response, metadata] = await sequelize.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = '${tabla}' and table_schema ='espaciales';
      `);
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapas(req, res) {
    try {
      const capas = await capasService.getAllCapas();
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasInternas(req, res) {
    const {id, id_rol, id_cliente } = req.user;
    try {
      const capas = await capasService.getAllCapasInternas(id_rol);
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasGrupos(req, res) {
    try {
      const response = await capasService.getAllCapasGrupos();
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasSupergrupos(req, res) {
    try {
      const response = await capasService.getAllCapasSuperGrupo();
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTablasEspaciales(req, res) {
    try {
      const response = await capasService.getAllTablasEspaciales();
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasPost(req, res) {
    const {
      id_grupo,
      c_nombre_tabla_capa,
      c_nombre_public_capa,
      c_nombre_geoserver,
      c_sql_capa,
      b_capa,
      c_tipo,
      c_url,
      c_servicio,
      c_url_seleccionado,
      b_geoportal
    } = req.body;
    const {id,id_rol} = req.user;
    try {
      const capas = await capasService.RegistrarCapas(
        id_grupo,
        c_nombre_tabla_capa,
        c_nombre_public_capa,
        c_nombre_geoserver,
        c_sql_capa,
        b_capa,
        c_tipo,
        c_url,
        c_servicio,
        id,
        id_rol,
        c_url_seleccionado,
        b_geoportal
      );
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasGruposPost(req, res) {
    const { id_super_grupo, c_nombre_grupo, b_grupo } = req.body;
    try {
      const capas = await capasService.RegistrarGrupos(
        id_super_grupo,
        c_nombre_grupo,
        b_grupo
      );
      res.status(200).json(capas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasSupergruposPost(req, res) {
    const { c_nombre_super_grupo, b_super_grupo } = req.body;
    try {
      const capas = await capasService.RegistrarSupergrupos(
        c_nombre_super_grupo,
        b_super_grupo
      );
      res.status(200).json(capas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasPut(req, res) {
    const {
      id_capa,
      id_grupo,
      c_nombre_tabla_capa,
      c_nombre_public_capa,
      c_nombre_geoserver,
      b_geoportal,
      b_capa,
      c_tipo,
      c_url,
      c_servicio,
      c_url_seleccionado,
      c_sql_capa
    } = req.body;
    const {id,id_rol} = req.user;
    try {
      const capas = await capasService.ActualizarCapas(
        id_capa,
        id_grupo,
        c_nombre_tabla_capa,
        c_nombre_public_capa,
        c_nombre_geoserver,
        b_geoportal,
        b_capa,
        c_tipo,
        c_url,
        c_servicio,
        id,
        id_rol,
        c_url_seleccionado,
        c_sql_capa
      );
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasGruposPut(req, res) {
    const { id_grupo, id_super_grupo, c_nombre_grupo, b_grupo } = req.body;
    try {
      const capas = await capasService.ActualizarGrupos(
        id_grupo,
        id_super_grupo,
        c_nombre_grupo,
        b_grupo
      );
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasSupergruposPut(req, res) {
    const { id_super_grupo, c_nombre_super_grupo, b_super_grupo } = req.body;
    try {
      const capas = await capasService.ActualizarSupergrupos(
        id_super_grupo,
        c_nombre_super_grupo,
        b_super_grupo
      );
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasDelete(req, res) {
    const { id_capa } = req.params;
    const {id,id_rol} = req.user;
    try {
      const capas = await capasService.EliminarCapas(id_capa,id,id_rol);
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasGruposDelete(req, res) {
    const { id_grupo } = req.params;
    try {
      const capas = await capasService.EliminarGrupos(id_grupo);
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasSupergruposDelete(req, res) {
    const { id_super_grupo } = req.params;
    try {
      const capas = await capasService.EliminarSupergrupos(id_super_grupo);
      res.status(200).json({ status: "success", data: capas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // async getStructure(req, res) {
  //   try {
  //     // redis cache
  //     const cacheKey = req.originalUrl;
  //     const cachedResponse = await redisClient.get(cacheKey);
  //     if (cachedResponse) {
  //       const parsedResponse = JSON.parse(cachedResponse);
  //       return res.json(parsedResponse);
  //     }

  //     const [superGrupos, metadata] = await sequelize.query(
  //       `select * from administracion.tadm_capas_supergrupo`
  //     );
  //     const dbResponse = superGrupos;
  //     for (let index = 0; index < superGrupos.length; index++) {
  //       const element = superGrupos[index];
  //       const [grupos, metadata] = await sequelize.query(
  //         `select * from administracion.tadm_capas_grupo WHERE id_super_grupo = ${element.id_super_grupo}`
  //       );
  //       for (let index = 0; index < grupos.length; index++) {
  //         const element = grupos[index];
  //         const [capas, metadata] = await sequelize.query(
  //           `select * from administracion.tadm_capas WHERE id_grupo = ${element.id_grupo}`
  //         );
  //         element.capas = capas;
  //       }
  //       element.grupos = grupos;
  //     }
  //     // redis cache
  //     const cacheExpiry = process.env.REDIS_TIME_CACHE;
  //     await redisClient.setex(
  //       cacheKey,
  //       cacheExpiry,
  //       JSON.stringify(dbResponse)
  //     );
  //     res.status(200).json({ status: "success", data: dbResponse });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  async getStructureInvitado(req, res) {
    const { id_geoportal } = req.params;
    console.log(id_geoportal);
    try {
      const rol = await Rol.findOne({
        where: {
          id_cliente: id_geoportal,
          c_nombre_rol: { [Sequelize.Op.iLike]: "%invitado%" },
        },
        attributes: ["id_rol"],
        limit: 1,
      });

      const [superGrupos, metadata] = await sequelize.query(
        `select distinct sp.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.id_rol}`
      );
      const dbResponse = superGrupos;
      for (let index = 0; index < superGrupos.length; index++) {
        const element = superGrupos[index];
        const [grupos, metadata] = await sequelize.query(
          `select distinct cp.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.id_rol} and cp.id_super_grupo = ${element.id_super_grupo}`
        );
        for (let index = 0; index < grupos.length; index++) {
          const element = grupos[index];
          const [capas, metadata] = await sequelize.query(
            `select distinct tc.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.id_rol} and tc.id_grupo = ${element.id_grupo}`
          );
          element.capas = capas;
        }
        element.grupos = grupos;
      }
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStructure(req, res) {
    const { id, id_rol, id_cliente } = req.user;
    try {
      const rol = await TgUsuario.findOne({
        where: { id_usuario: id, id_cliente: id_cliente },
      });

      if (!rol) {
        const [superGrupos, metadata] = await sequelize.query(
          `select * from administracion.tadm_capas_supergrupo order by n_orden asc`
        );
        const dbResponse = superGrupos;
        for (let index = 0; index < superGrupos.length; index++) {
          const element = superGrupos[index];
          const [grupos, metadata] = await sequelize.query(
            `select * from administracion.tadm_capas_grupo WHERE id_super_grupo = ${element.id_super_grupo}`
          );
          for (let index = 0; index < grupos.length; index++) {
            const element = grupos[index];
            const [capas, metadata] = await sequelize.query(
              `select * from administracion.tadm_capas WHERE id_grupo = ${element.id_grupo}`
            );
            element.capas = capas;
          }
          element.grupos = grupos;
        }
        res.status(200).json({ status: "success", data: dbResponse });
      } else {
        const rol = await TgUsuario.findOne({
          where: { id_usuario: id, id_cliente: id_cliente },
        });

        const [superGrupos, metadata] = await sequelize.query(
          `select distinct sp.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.rol_id}`
        );
        const dbResponse = superGrupos;
        for (let index = 0; index < superGrupos.length; index++) {
          const element = superGrupos[index];
          const [grupos, metadata] = await sequelize.query(
            `select distinct cp.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.rol_id} and cp.id_super_grupo = ${element.id_super_grupo}`
          );
          for (let index = 0; index < grupos.length; index++) {
            const element = grupos[index];
            const [capas, metadata] = await sequelize.query(
              `select distinct tc.* from administracion.tadm_capas_supergrupo sp
        inner join administracion.tadm_capas_grupo cp on sp.id_super_grupo=cp.id_super_grupo
        inner join administracion.tadm_capas tc on cp.id_grupo=tc.id_grupo
        inner join administracion.rol_capas rc on tc.id_capa=rc.fk_capa
        where fk_rol=${rol.rol_id} and tc.id_grupo = ${element.id_grupo}`
            );
            element.capas = capas;
          }
          element.grupos = grupos;
        }
        res.status(200).json({ status: "success", data: dbResponse });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVisibles(req, res) {
    // console.log('prueba');
    const { id_capa, id_rol } = req.params;
    const {id_rol:id_rol_usuario} = req.user;
    console.log(id_capa,id_rol,id_rol_usuario);
    try {
      let id_rol_enviar
      if (id_rol != "undefined") {
        id_rol_enviar = id_rol
      } else {
        id_rol_enviar = id_rol_usuario.toString()
      }
      // console.log('ID_CAPA Y ROL FINAL:' + id_capa, id_rol_enviar);
      let dbResponse = await capasService.getCapasVisibles(id_capa, id_rol_enviar);
      if (dbResponse.length == 0) {
        const responseCreate = await capasService.postCapasVisibles(
          id_capa,
          id_rol_enviar
        );
        // console.log(responseCreate);
        dbResponse = responseCreate;
      }
      console.log(dbResponse);
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVisiblesInvitado(req, res) {
    const { id_capa, id_cliente } = req.params;
    try {
      // console.log('ID_CAPA Y ROL FINAL:' + id_capa, id_cliente);
      let dbResponse = await capasService.getCapasVisiblesInvitado(id_capa, id_cliente);
      if (dbResponse.length == 0) {
        // console.log('vamos a crear una capa');
        const responseCreate = await capasService.postCapasVisiblesInvitado(
          id_capa,
          id_cliente
        );
        // console.log(responseCreate);
        dbResponse = responseCreate;
      }
      // console.log(dbResponse);
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVistas(req, res) {
    // const { id_capa } = req.params;
    try {
      let dbResponse = await capasService.getVistas();
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVistas(req, res) {
    const { id_vista } = req.params;
    try {
      let dbResponse = await capasService.deleteVistas(id_vista);
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async postVistas(req, res) {
    const { c_extent, c_capas, c_mapa_base, c_nombre } = req.body;
    try {
      let dbResponse = await capasService.postVistas(
        c_extent,
        c_capas,
        c_mapa_base,
        c_nombre
      );
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async putVisibles(req, res) {
    const { id, c_array_campos } = req.body;
    try {
      await capasService.putCapasVisibles(id, c_array_campos);
      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async busquedaAvanzada(req, res) {
    const { simbolo, column, layer, inputBt } = req.body;
    // console.log(simbolo, column, layer, inputBt);
    try {
      const respuesta = await capasService.busquedaAvanzada(
        simbolo,
        column,
        layer,
        inputBt
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroAfiliados(req, res) {
    const { idccpp } = req.params;
    try {
      const respuesta = await capasService.filtroAfiliados(
        idccpp
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroAfiliadosArea(req, res) {
    const { idccpp } = req.body;
    try {
      const ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
      const respuesta = await capasService.filtroAfiliadosArea(
        ccppFormato
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroServiciosGenerales(req, res) {
    const { idccpp, tipoServicio} = req.body;
    try {
      let tabla
      let where
      let leftjoin
      let nombEst
      let clasicacionCS = ''
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          where = "id_ccpp = '"+idccpp+"'"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          clasicacionCS = ',nomb.clasificac'
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          where = "id_ccpp = '"+idccpp+"'"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServicios(
        tabla, where,leftjoin,nombEst,clasicacionCS
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async filtroServiciosAreaGenerales(req,res) {
    const { idccpp, tipoServicio} = req.body;
    // console.log(req.body);
    const ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
    try {
      let tabla
      let where
      let leftjoin
      let nombEst
      let clasicacionCS = ''
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          where = "id_ccpp in ("+ccppFormato+")"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          clasicacionCS = ',nomb.clasificac'
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          where = "id_ccpp in ("+ccppFormato+")"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServicios(
        tabla, where,leftjoin,nombEst,clasicacionCS
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroServiciosAreaNoCob(req, res) {
    const { tipoServicio,categoria,distancia,nivel,idccpp } = req.body;
    try {
      let tabla
      let where
      let ccppFormato
      let leftjoin
      let nombEst
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          let categoriaFormato = categoria.map(item => `'${item}'`).join(', ');
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and distancia_km > "+distancia+" and categoria_eess in ("+categoriaFormato+")"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and distancia_km > "+distancia+" and nivmodali_iiee = '" + nivel + "'"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServiciosArea(
        tabla, where,leftjoin,nombEst
      );
      // console.log(respuesta);
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroServiciosArea(req, res) {
    const { tipoServicio,categoria,distancia,nivel,idccpp } = req.body;
    try {
      let tabla
      let where
      let ccppFormato
      let leftjoin
      let nombEst
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          let categoriaFormato = categoria.map(item => `'${item}'`).join(', ');
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and distancia_km < "+distancia+" and categoria_eess in ("+categoriaFormato+")"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and distancia_km < "+distancia+" and nivmodali_iiee = '" + nivel + "'"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServiciosArea(
        tabla, where,leftjoin,nombEst
      );
      // console.log(respuesta);
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroServicios(req, res) {
    const { tipoServicio,categoria,distancia,nivel,idccpp } = req.body;
    try {
      let tabla
      let where
      let leftjoin
      let nombEst
      let clasicacionCS = ''
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          let formattedString = categoria.map(item => `'${item}'`).join(', ');
          where = "id_ccpp = '"+idccpp+"' and distancia_km < "+distancia+" and categoria_eess in ("+formattedString+")"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          clasicacionCS = ',nomb.clasificac'
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          where = "id_ccpp = '"+idccpp+"' and distancia_km < "+distancia+" and nivmodali_iiee = '" + nivel + "'"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServicios(
        tabla, where,leftjoin,nombEst,clasicacionCS
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async archivoShape(req, res) {
    // console.log(simbolo, column, layer, inputBt);
    const { geoserver, workspace, layer, simbolo, column, inputBt } = req.body;
    try {
      let url = "";
      if (simbolo != "" && column != "" && inputBt != "") {
        url =
          geoserver +
          "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
          workspace +
          ":" +
          layer +
          "&outputFormat=application/json&CQL_FILTER=" +
          column +
          simbolo +
          inputBt;
      } else {
        url =
          geoserver +
          "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
          workspace +
          ":" +
          layer +
          "&outputFormat=application/json";
      }
      const response = await axios.get(url);
      const geojson = response.data;
      // console.log(geojson);
      const options = {
        folder: "myshapes",
        types: {
          point: "mypoints",
          polygon: "mypolygons",
          polyline: "mylines",
        },
      };
      // Convertir GeoJSON a formato Shapefile
      var content = zip(geojson, options);
      res.set("Content-Type", "application/zip");
      res.set("Content-Disposition", "attachment; filename=archivo.zip");
      res.send(Buffer.from(content, "base64"));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async archivoJson(req, res) {
    // console.log(simbolo, column, layer, inputBt);
    const { jsonData } = req.body;
    try {
      // Configurar cabeceras para indicar que se envía un archivo JSON
      res.setHeader("Content-Disposition", "attachment; filename=datos.json");
      res.setHeader("Content-Type", "application/json");

      // Convertir el objeto JSON a una cadena JSON y enviarlo en el cuerpo de la respuesta
      res.send(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async archivoGeoJSON(req, res) {
    const { jsonData } = req.body; // Obtener el JSON de la solicitud
  
    try {
      // Crear una FeatureCollection para almacenar las características GeoJSON
      const featureCollection = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:EPSG::4326"
          }
        },
        features: jsonData.map(obj => {
          // Comprobar si COUBIX y COUBIY existen en el objeto
          if (obj.COUBIX !== undefined && obj.COUBIY !== undefined) {
            // Crear un objeto Feature GeoJSON para cada objeto
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [obj.COUBIX, obj.COUBIY] // [longitud, latitud]
              },
              properties: obj
            };
          } else {
            return null; // Retornar null si las coordenadas no están presentes en el objeto
          }
        }).filter(feature => feature !== null) // Filtrar para eliminar objetos nulos
      };
  
      // Convertir el objeto FeatureCollection a cadena GeoJSON
      const geoJSONString = JSON.stringify(featureCollection, null, 2);
  
      // Configurar cabeceras para indicar que se envía un archivo JSON
      res.setHeader("Content-Disposition", "attachment; filename=datos.geojson");
      res.setHeader("Content-Type", "application/json");
  
      // Enviar el GeoJSON en el cuerpo de la respuesta
      res.send(geoJSONString);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cruceInformacion(req, res) {
    const { capas, tipo, busqueda, page = 1, pageSize = 5} = req.body;
    try {
      const offset = (page - 1) * pageSize;
      const respuesta = await capasService.cruceInformacion(capas,tipo,busqueda,offset,pageSize);
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async validacionData(req, res) {
    // const { simbolo, column, layer, inputBt} = req.body;
    // console.log(simbolo, column, layer, inputBt);
    try {
      const respuesta = await capasService.validacionData();
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async jsonFallido(req, res) {
    const { id } = req.params;
    try {
      const respuesta = await capasService.jsonFallido(id);
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async descargarExcel(req, res) {
    function acortarTexto(texto, longitudMaxima) {
      if (texto.length > longitudMaxima) {
        return texto.substring(0, longitudMaxima - 3) + "...";
      } else {
        return texto;
      }
    }
    const { table, datosCapas } = req.body;
    try {
      let exportarTemp = [];
      for (const item of table) {
        let cantidadPoblacion = 0;
        let cantidadPoblacionNoCob = 0;
  
        if (item.arrayCCPP && item.arrayCCPPNoCob) {
          const dataCob = item.arrayCCPP;
          if (dataCob.length > 0) {
            cantidadPoblacion = await capasService.sumaCCPPPob(dataCob);
          }
  
          const dataNoCob = item.arrayCCPPNoCob;
          if (dataNoCob.length > 0) {
            cantidadPoblacionNoCob = await capasService.sumaCCPPPob(dataNoCob);
          }
        }
        exportarTemp.push({
          1: item.grupo,
          2: item.titulo,
          3: item.cantidadCCPP,
          4: cantidadPoblacion,
          5: item.cantidadCCPPNoCob,
          6: cantidadPoblacionNoCob
        });
      }
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Reporte general");

      worksheet.columns = [
        { header: "Nombre Grupo", key: "1", width: 30 },
        { header: "Nombre Titulo", key: "2", width: 50 },
        { header: "Cantidad CCPP", key: "3", width: 50 },
        { header: "Cantidad Población", key: "4", width: 50 },
        { header: "Cantidad CCPP Fuera Cobertura", key: "5", width: 50 },
        { header: "Cantidad Población Fuera Cobertura", key: "6", width: 50 },
      ];

      worksheet.getCell("A1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };
      worksheet.getCell("B1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };
      worksheet.getCell("C1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };
      worksheet.getCell("D1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };

      worksheet.getCell("E1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };
      worksheet.getCell("F1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A3E4D7" },
      };


      // Add Array Rows
      worksheet.addRows(exportarTemp);

      let nombresExistentes = [];
      function nombreUnico(nombresExistentes, titulo) {
        for (let i = 2; ; i++) {
          const sufijo = `_${i}`;
          const nuevoNombreConSufijo =
            acortarTexto(titulo, 31 - sufijo.length) + sufijo;
          if (!nombresExistentes.includes(nuevoNombreConSufijo)) {
            return nuevoNombreConSufijo;
          }
        }
      }
      datosCapas.forEach((element) => {
        let titulo = element.grupo + " " + element.capa;
        titulo = acortarTexto(titulo, 31);
        if (nombresExistentes.includes(titulo)) {
          titulo = nombreUnico(nombresExistentes, titulo);
          nombresExistentes.push(titulo);
        } else {
          nombresExistentes.push(titulo);
        }
        // console.log(nombresExistentes);
        let worksheet = workbook.addWorksheet(titulo);
        const data = element.rows;
        const columnas = element.campos;
        const exportarTempo = [];
        for (let index in data) {
          // console.log('rows : ', data[index]);
          const newData = {};
          for (let index2 in columnas) {
            // console.log(columnas[index2]);
            const field = columnas[index2];
            const index3 = parseInt(index2) + 1;
            newData[index3] = data[index][field];
          }
          // console.log('newdata', newData);
          exportarTempo.push(newData);
        }

        const columns = [];
        for (let index in columnas) {
          const element = columnas[index];
          const newColumns = {};
          newColumns.header = element;
          newColumns.key = (parseInt(index) + 1).toString();
          newColumns.width = 30;
          columns.push(newColumns);
        }
        worksheet.columns = columns;

        const pintado = [
          { cantidad: 1, celda: "A1" },
          { cantidad: 2, celda: "B1" },
          { cantidad: 3, celda: "C1" },
          { cantidad: 4, celda: "D1" },
          { cantidad: 5, celda: "E1" },
          { cantidad: 6, celda: "F1" },
          { cantidad: 7, celda: "G1" },
          { cantidad: 8, celda: "H1" },
          { cantidad: 9, celda: "I1" },
          { cantidad: 10, celda: "J1" },
          { cantidad: 11, celda: "K1" },
          { cantidad: 12, celda: "L1" },
          { cantidad: 13, celda: "M1" },
          { cantidad: 14, celda: "N1" },
          { cantidad: 15, celda: "O1" },
          { cantidad: 16, celda: "P1" },
          { cantidad: 17, celda: "Q1" },
          { cantidad: 18, celda: "R1" },
          { cantidad: 19, celda: "S1" },
          { cantidad: 20, celda: "T1" },
          { cantidad: 21, celda: "U1" },
          { cantidad: 22, celda: "V1" },
          { cantidad: 23, celda: "W1" },
          { cantidad: 24, celda: "X1" },
          { cantidad: 25, celda: "Y1" },
          { cantidad: 26, celda: "Z1" },
          { cantidad: 27, celda: "AA1" },
          { cantidad: 28, celda: "AB1" },
          { cantidad: 29, celda: "AC1" },
          { cantidad: 30, celda: "AD1" },
          { cantidad: 31, celda: "AE1" },
          { cantidad: 32, celda: "AF1" },
          { cantidad: 33, celda: "AG1" },
          { cantidad: 34, celda: "AH1" },
          { cantidad: 35, celda: "AI1" },
          { cantidad: 36, celda: "AJ1" },
          { cantidad: 37, celda: "AK1" },
          { cantidad: 38, celda: "AL1" },
          { cantidad: 39, celda: "AM1" },
        ];

        for (let index = 1; index < columns.length + 1; index++) {
          const celda = pintado.filter(
            (elements) => elements.cantidad === parseInt(index)
          );
          if (celda[0].celda) {
            // console.log(celda[0].celda);
            worksheet.getCell(celda[0].celda).fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "A3E4D7" },
            };
          }
        }

        worksheet.addRows(exportarTempo);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Reporte filtro.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

  async descargarExcelSoloCapas(req, res) {
    const { layer } = req.body;
    try {
      const [response, metadata] = await sequelize.query(
        `select * from espaciales.${layer}`
      );
      const titulo = layer;
      const data = response;
      const columnas = [];
      if (response.length > 0) {
        for (let index in response[0]) {
          columnas.push(index);
        }
      }

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet(titulo);

      const exportarTempo = [];
      for (let index in data) {
        // console.log('rows : ', data[index]);
        const newData = {};
        for (let index2 in columnas) {
          // console.log(columnas[index2]);
          const field = columnas[index2];
          const index3 = parseInt(index2) + 1;
          newData[index3] = data[index][field];
        }
        // console.log('newdata', newData);
        exportarTempo.push(newData);
      }
      // console.log(exportarTempo);
      const columns = [];
      for (let index in columnas) {
        const element = columnas[index];
        const newColumns = {};
        newColumns.header = element;
        newColumns.key = (parseInt(index) + 1).toString();
        newColumns.width = 30;
        columns.push(newColumns);
      }
      // console.log(columns);
      worksheet.columns = columns;
      // console.log(exportarTempo);
      const pintado = [
        { cantidad: 1, celda: "A1" },
        { cantidad: 2, celda: "B1" },
        { cantidad: 3, celda: "C1" },
        { cantidad: 4, celda: "D1" },
        { cantidad: 5, celda: "E1" },
        { cantidad: 6, celda: "F1" },
        { cantidad: 7, celda: "G1" },
        { cantidad: 8, celda: "H1" },
        { cantidad: 9, celda: "I1" },
        { cantidad: 10, celda: "J1" },
        { cantidad: 11, celda: "K1" },
        { cantidad: 12, celda: "L1" },
        { cantidad: 13, celda: "M1" },
        { cantidad: 14, celda: "N1" },
        { cantidad: 15, celda: "O1" },
        { cantidad: 16, celda: "P1" },
        { cantidad: 17, celda: "Q1" },
        { cantidad: 18, celda: "R1" },
        { cantidad: 19, celda: "S1" },
        { cantidad: 20, celda: "T1" },
        { cantidad: 21, celda: "U1" },
        { cantidad: 22, celda: "V1" },
        { cantidad: 23, celda: "W1" },
        { cantidad: 24, celda: "X1" },
        { cantidad: 25, celda: "Y1" },
        { cantidad: 26, celda: "Z1" },
        { cantidad: 27, celda: "AA1" },
        { cantidad: 28, celda: "AB1" },
        { cantidad: 29, celda: "AC1" },
        { cantidad: 30, celda: "AD1" },
        { cantidad: 31, celda: "AE1" },
        { cantidad: 32, celda: "AF1" },
        { cantidad: 33, celda: "AG1" },
        { cantidad: 34, celda: "AH1" },
        { cantidad: 35, celda: "AI1" },
        { cantidad: 36, celda: "AJ1" },
        { cantidad: 37, celda: "AK1" },
        { cantidad: 38, celda: "AL1" },
        { cantidad: 39, celda: "AM1" },
      ];

      for (let index = 1; index < columns.length + 1; index++) {
        const celda = pintado.filter(
          (elements) => elements.cantidad === parseInt(index)
        );
        if (celda[0].celda) {
          // console.log(celda[0].celda);
          worksheet.getCell(celda[0].celda).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A3E4D7" },
          };
        }
      }

      worksheet.addRows(exportarTempo);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + titulo + ".xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

  async descargarExcelFiltros(req, res) {
    const { tipoServicio,categoria,distancia,nivel,idccpp } = req.body;
    const titulo = 'titulo prueba'
    // console.log(columnas);
    try {

      let tabla
      let where
      let ccppFormato
      let leftjoin
      let nombEst
      switch (tipoServicio) {
        case "S":
          tabla = "ccpp_eess_total_atributos"
          let categoriaFormato = categoria.map(item => `'${item}'`).join(', ');
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and categoria_eess in ("+categoriaFormato+")" // and distancia_km < "+distancia+""
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "id_ccpp in ("+ccppFormato+") and nivmodali_iiee = '" + nivel + "'" // and distancia_km < "+distancia+""
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const responseExcel = await capasService.filtroServiciosAreaExcel(
        tabla, where,leftjoin,nombEst,distancia
      );
      const datosExcel = []
      if (responseExcel.length>0) {
        responseExcel.map((e,index)=>{
          let codigoServicio
          let categoriaNivel
          if (tipoServicio == "S") {
            codigoServicio = e.codigo_eess
            categoriaNivel = e.categoria_eess;
          } else {
            codigoServicio = e.codlocal_iiee;
            categoriaNivel = e.nivmodali_iiee;
          }
          datosExcel.push({id_ccpp: e.id_ccpp, nombccpp: e.nombccpp, area_17: e.area_17, ubigeo: e.ubigeo,
            coddpto:e.coddpto, codprov: e.codprov, coddist: e.coddist, codccpp: e.codccpp, capital:e.capital,
            nombdep:e.nombdep, nombprov: e.nombprov, nombdist:e.nombdist,
            pob_total:e.pob_total_cpv2017,pob_menor_3:e.pob_menor_3_anios_pnominal,pob_menor_1:e.pob_menor_1_anio_pnominal,
            pob_3_5a: e.pob_3_5_anios_cpv2017, pob_6_11a:e.pob_6_11_anios_cpv2017, pob_12_16a:e.pob_12_16_anios_cpv2017,
            cod_serv: codigoServicio, nomb_serv:e.nombre_lugar, categoriaNivel: categoriaNivel, distancia:e.distancia_km,
            cobertura: e.cobertura, disponib_serrv: e.contador
          })
        })
      }

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet(titulo);

      const columnas = [];
      // for (let i = 1; i <= 24; i++) {
      //   titulo2.push({ header: '', key: i.toString(), width: 30 });
      // }

      columnas.push({ header: '', key: 'id_ccpp', width: 30});
      columnas.push({ header: '', key: 'nombccpp', width: 30});
      columnas.push({ header: '', key: 'area_17', width: 30});
      columnas.push({ header: '', key: 'ubigeo', width: 30});
      columnas.push({ header: '', key: 'coddpto', width: 30});
      columnas.push({ header: '', key: 'codprov', width: 30});
      columnas.push({ header: '', key: 'coddist', width: 30});
      columnas.push({ header: '', key: 'codccpp', width: 30});
      columnas.push({ header: '', key: 'nombdep', width: 30});
      columnas.push({ header: '', key: 'nombprov', width: 30});
      columnas.push({ header: '', key: 'nombdist', width: 30});
      columnas.push({ header: '', key: 'capital', width: 30});
      columnas.push({ header: '', key: 'pob_total', width: 30});
      columnas.push({ header: '', key: 'pob_menor_3', width: 30});
      columnas.push({ header: '', key: 'pob_menor_1', width: 30});
      columnas.push({ header: '', key: 'pob_3_5a', width: 30});
      columnas.push({ header: '', key: 'pob_6_11a', width: 30});
      columnas.push({ header: '', key: 'pob_12_16a', width: 30});
      columnas.push({ header: '', key: 'cod_serv', width: 30});
      columnas.push({ header: '', key: 'nomb_serv', width: 30});
      columnas.push({ header: '', key: 'categoriaNivel', width: 30});
      columnas.push({ header: '', key: 'distancia', width: 30});
      columnas.push({ header: '', key: 'cobertura', width: 30});
      columnas.push({ header: '', key: 'disponib_serrv', width: 30});

      worksheet.columns = columnas;

      // Añadir los títulos en la parte superior
      worksheet.mergeCells('A1:L1');  // Primer título ocupa 12 espacios
      worksheet.getCell('A1').value = 'Referente a los centros poblados';
      
      worksheet.getCell('M1').value = 'Población Total (Censada)';
      worksheet.getCell('N1').value = 'Población <3° (P. Nominal)';
      worksheet.getCell('O1').value = 'Población <1° (P. Nominal)';

      worksheet.getCell('P1').value = 'Población de 3-5a';
      worksheet.getCell('Q1').value = 'Población de 6-11a (Censada)';
      worksheet.getCell('R1').value = 'Población de 12-16a (Censada)';

      worksheet.mergeCells('S1:U1');  // Cuarto título ocupa 3 espacios
      worksheet.getCell('S1').value = 'Referente al servicio Salud o Educación';
      
      worksheet.mergeCells('V1:X1');  // Quinto título ocupa 3 espacios
      worksheet.getCell('V1').value = 'Disponibilidad del servicio más cercano';

      // Estilo para los títulos
      const tituloStyles = {
        'A1': { bgColor: '000000', fontColor: 'FFFFFF' },  // Fondo negro, letras blancas
        'M1': { bgColor: '800080', fontColor: 'FFFFFF' },  // Fondo morado, letras blancas
        'N1': { bgColor: '800080', fontColor: 'FFFFFF' },  // Fondo morado, letras blancas
        'O1': { bgColor: '800080', fontColor: 'FFFFFF' },  // Fondo morado, letras blancas
        'P1': { bgColor: '000000', fontColor: 'FFFFFF' },  // Fondo negro, letras blancas
        'Q1': { bgColor: '000000', fontColor: 'FFFFFF' },  // Fondo negro, letras blancas
        'R1': { bgColor: '000000', fontColor: 'FFFFFF' },  // Fondo negro, letras blancas
        'S1': { bgColor: '008000', fontColor: 'FFFFFF' },  // Fondo verde, letras blancas
        'V1': { bgColor: '0000FF', fontColor: 'FFFFFF' },  // Fondo azul, letras blancas
      };

      for (const cell in tituloStyles) {
        worksheet.getCell(cell).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: tituloStyles[cell].bgColor }
        };
        worksheet.getCell(cell).font = {
          color: { argb: tituloStyles[cell].fontColor },
          bold: true,
          size: 12
        };
        worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
      }


      // Textos en la segunda fila
      const secondRowTexts = [
        'IDCCPP_21', 'NOMBCCPP', 'AREA_21', 'UBIGEO', 'CODDPTO', 'CODPROV', 'CODDIST', 'CODCCPP',
        'NOMBDEP', 'NOMPROV', 'NOMBDIST', 'CAPITAL', 'POB_TOT', 'POB_<3a', 'POB_<1a', 'P_3_5a',
        'P_6_11a', 'P_12_16a', 'COD_SERV', 'NONB_SERV', 'CATEG/NIVEL', 'DISTANCIA', 'COBERTURA',
        'DISPONIB_SERRV'
      ];

      const secondRowStyles = [
        'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 'A1', 
        'M1', 'M1', 'M1', 'P1', 'P1', 'P1',
        'S1', 'S1', 'S1', 
        'V1', 'V1', 'V1'
      ];

      for (let i = 0; i < secondRowTexts.length; i++) {
        const cell = worksheet.getCell(2, i + 1);
        cell.value = secondRowTexts[i];
        const style = tituloStyles[secondRowStyles[i]];
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: style.bgColor }
        };
        cell.font = {
          color: { argb: style.fontColor },
          // bold: true,
          size: 9
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      worksheet.addRows(datosExcel);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + titulo + ".xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

  async descargarExcelSimple(req, res) {
    const { data, columnas, titulo } = req.body;
    // console.log(columnas);
    try {
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet(titulo);

      const exportarTempo = [];
      for (let index in data) {
        // console.log('rows : ', data[index]);
        const newData = {};
        for (let index2 in columnas) {
          // console.log(columnas[index2]);
          const field = columnas[index2];
          const index3 = parseInt(index2) + 1;
          newData[index3] = data[index][field];
        }
        // console.log('newdata', newData);
        exportarTempo.push(newData);
      }
      // console.log(exportarTempo);
      const columns = [];
      for (let index in columnas) {
        const element = columnas[index];
        const newColumns = {};
        newColumns.header = element;
        newColumns.key = (parseInt(index) + 1).toString();
        newColumns.width = 30;
        columns.push(newColumns);
      }
      // console.log(columns);
      worksheet.columns = columns;

      const pintado = [
        { cantidad: 1, celda: "A1" },
        { cantidad: 2, celda: "B1" },
        { cantidad: 3, celda: "C1" },
        { cantidad: 4, celda: "D1" },
        { cantidad: 5, celda: "E1" },
        { cantidad: 6, celda: "F1" },
        { cantidad: 7, celda: "G1" },
        { cantidad: 8, celda: "H1" },
        { cantidad: 9, celda: "I1" },
        { cantidad: 10, celda: "J1" },
        { cantidad: 11, celda: "K1" },
        { cantidad: 12, celda: "L1" },
        { cantidad: 13, celda: "M1" },
        { cantidad: 14, celda: "N1" },
        { cantidad: 15, celda: "O1" },
        { cantidad: 16, celda: "P1" },
        { cantidad: 17, celda: "Q1" },
        { cantidad: 18, celda: "R1" },
        { cantidad: 19, celda: "S1" },
        { cantidad: 20, celda: "T1" },
        { cantidad: 21, celda: "U1" },
        { cantidad: 22, celda: "V1" },
        { cantidad: 23, celda: "W1" },
        { cantidad: 24, celda: "X1" },
        { cantidad: 25, celda: "Y1" },
        { cantidad: 26, celda: "Z1" },
        { cantidad: 27, celda: "AA1" },
        { cantidad: 28, celda: "AB1" },
        { cantidad: 29, celda: "AC1" },
        { cantidad: 30, celda: "AD1" },
        { cantidad: 31, celda: "AE1" },
        { cantidad: 32, celda: "AF1" },
        { cantidad: 33, celda: "AG1" },
        { cantidad: 34, celda: "AH1" },
        { cantidad: 35, celda: "AI1" },
        { cantidad: 36, celda: "AJ1" },
        { cantidad: 37, celda: "AK1" },
        { cantidad: 38, celda: "AL1" },
        { cantidad: 39, celda: "AM1" },
      ];

      for (let index = 1; index < columns.length + 1; index++) {
        const celda = pintado.filter(
          (elements) => elements.cantidad === parseInt(index)
        );
        if (celda[0].celda) {
          // console.log(celda[0].celda);
          worksheet.getCell(celda[0].celda).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A3E4D7" },
          };
        }
      }

      worksheet.addRows(exportarTempo);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + titulo + ".xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

  async descargarExcelCruzada(req, res) {
    // console.log(req.body);
    const { data, cantidad, listaCapas, campoBuscado } = req.body;
    // console.log(columnas);
    try {
      let workbook = new excel.Workbook();
      let worksheetResumen = workbook.addWorksheet("RESUMEN DE BUSQUEDA");
      const titulo = [
        { header: 'PROGRAMA', key: '1', width: 30 },
        { header: 'CAPA', key: '2', width: 30 },
        { header: 'TIPO DE BUSQUEDA', key: '3', width: 30 }
      ]
      worksheetResumen.columns = titulo;
      const exportarTempoResumen = []
      for (let index in listaCapas) {
        const element = listaCapas[index];
        const capas = { '1':element.programa, '2': element.label, '3':campoBuscado}
        exportarTempoResumen.push(capas)
      }
      const cantidadR = { '1':'N° elementos encontrados:', '2': cantidad}
      exportarTempoResumen.push(cantidadR)
      worksheetResumen.addRows(exportarTempoResumen);
      let worksheet = workbook.addWorksheet("RESULTADOS BUSQUEDA GRUPAL");
      let contador = 0
      const exportarTempo = [];
      const columns = [];
      const consulta_grupal = data.consulta_grupal

      if (campoBuscado == "Centro Poblado") {
        columns.push({ header: "Nombre Centro Poblado", key: '1', width: 30 })
        columns.push({ header: campoBuscado, key: '2', width: 30 })
        columns.push({ header: "Cantidad", key: '3', width: 30 })
      } else {
        columns.push({ header: campoBuscado, key: '1', width: 30 })
        columns.push({ header: "Cantidad", key: '2', width: 30 })
      }
      if (consulta_grupal.length>0 && campoBuscado == "Centro Poblado") {
        for (let index in consulta_grupal) {
          const element = consulta_grupal[index];
          // console.log(element);
            exportarTempo.push({ '1':element.nombccpp, '2':element['IDCCPP'], '3':element.cantidad})
        }
      } else if(consulta_grupal.length>0) {
        for (let index in consulta_grupal) {
          const element = consulta_grupal[index];
          let firstElement = element;
          let firstKey = Object.keys(firstElement)[0];
            // console.log(element);
            exportarTempo.push({ '1':element[firstKey], '2':element.cantidad})
        }
      }
      // console.log(columns);
      worksheet.columns = columns;
      const pintado = [
        { cantidad: 1, celda: "A1" },
        { cantidad: 2, celda: "B1" },
        { cantidad: 3, celda: "C1" },
        { cantidad: 4, celda: "D1" },
        { cantidad: 5, celda: "E1" },
        { cantidad: 6, celda: "F1" },
        { cantidad: 7, celda: "G1" },
        { cantidad: 8, celda: "H1" },
        { cantidad: 9, celda: "I1" },
        { cantidad: 10, celda: "J1" },
        { cantidad: 11, celda: "K1" },
        { cantidad: 12, celda: "L1" },
        { cantidad: 13, celda: "M1" },
        { cantidad: 14, celda: "N1" },
        { cantidad: 15, celda: "O1" },
        { cantidad: 16, celda: "P1" },
        { cantidad: 17, celda: "Q1" },
        { cantidad: 18, celda: "R1" },
        { cantidad: 19, celda: "S1" },
        { cantidad: 20, celda: "T1" },
        { cantidad: 21, celda: "U1" },
        { cantidad: 22, celda: "V1" },
        { cantidad: 23, celda: "W1" },
        { cantidad: 24, celda: "X1" },
        { cantidad: 25, celda: "Y1" },
        { cantidad: 26, celda: "Z1" },
        { cantidad: 27, celda: "AA1" },
        { cantidad: 28, celda: "AB1" },
        { cantidad: 29, celda: "AC1" },
        { cantidad: 30, celda: "AD1" },
        { cantidad: 31, celda: "AE1" },
        { cantidad: 32, celda: "AF1" },
        { cantidad: 33, celda: "AG1" },
        { cantidad: 34, celda: "AH1" },
        { cantidad: 35, celda: "AI1" },
        { cantidad: 36, celda: "AJ1" },
        { cantidad: 37, celda: "AK1" },
        { cantidad: 38, celda: "AL1" },
        { cantidad: 39, celda: "AM1" },
      ];

      for (let index = 1; index < columns.length + 1; index++) {
        const celda = pintado.filter(
          (elements) => elements.cantidad === parseInt(index)
        );
        if (celda[0].celda) {
          // console.log(celda[0].celda);
          worksheet.getCell(celda[0].celda).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A3E4D7" },
          };
        }
      }

      for (let index = 1; index < titulo.length + 1; index++) {
        const celda = pintado.filter(
          (elements) => elements.cantidad === parseInt(index)
        );
        if (celda[0].celda) {
          // console.log(celda[0].celda);
          worksheetResumen.getCell(celda[0].celda).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A3E4D7" },
          };
        }
      }

      worksheet.addRows(exportarTempo);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=resultados.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }
}
