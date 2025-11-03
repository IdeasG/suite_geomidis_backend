import "dotenv/config";

import { validatePagination } from "../../schemas/generales/pagination.js";

import { CapasService } from "../../services/espaciales/capas.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import excel from "exceljs/dist/es5/index.js";
import zip from "shp-write/src/zip.js";
import axios from "axios";
import TgUsuario from "../../models/security/tgUsuario.js";
import { Sequelize } from "sequelize";
import Rol from "../../models/security/rol.js";
import Vistas from "../../models/manager/vistas.js";
import fs from "fs";
import { log } from "console";

const capasService = new CapasService();

export class CapasController {
  constructor() {}

  // // Función helper para generar la fecha de reporte
  // generarFechaReporte() {
  //   try {
  //     const ahora = new Date();
      
  //     // Crear fecha en zona horaria de Lima
  //     const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
      
  //     const meses = [
  //       'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  //       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  //     ];
      
  //     const dia = fechaLima.getDate().toString().padStart(2, '0');
  //     const mes = meses[fechaLima.getMonth()];
  //     const año = fechaLima.getFullYear();
  //     const hora = fechaLima.getHours().toString().padStart(2, '0');
  //     const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
      
  //     return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
  //   } catch (error) {
  //     console.error('Error en generarFechaReporte:', error);
  //     return 'Fecha de generación no disponible';
  //   }
  // }

  generarFechaReporte() {
    try {
      const ahora = new Date();
      
      // Crear fecha en zona horaria de Lima
      const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
      
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      
      const dia = fechaLima.getDate().toString().padStart(2, '0');
      const mes = meses[fechaLima.getMonth()];
      const año = fechaLima.getFullYear();
      const hora = fechaLima.getHours().toString().padStart(2, '0');
      const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
      
      return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
    } catch (error) {
      console.error('Error en generarFechaReporte:', error);
      return 'Fecha de generación no disponible';
    }
  }
  async getPublicadosGeoportal(req, res) {
    try {
      const response = await capasService.getPublicadosGeoportalIn()
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasTable(req, res) {
    const { page = 1, pageSize = 5, filter = "" } = req.query;
    try {
      const offset = (page - 1) * pageSize;
      const response = await capasService.getAllCapasTable(offset, pageSize, page, filter)
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCapasTableExterno(req, res) {
    const { page = 1, pageSize = 5, filter = "" } = req.query;
    try {
      const offset = (page - 1) * pageSize;
      const response = await capasService.getAllCapasTableExterno(offset, pageSize, page, filter)
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

  async getAllEsquemas(req, res) {
    try {
      const response = await capasService.getAllEsquemas();
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTablasEspaciales(req, res) {
    const { esquema } = req.params;
    try {
      const response = await capasService.getAllTablasEspaciales(esquema);
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
      c_workspace,
      c_sql_capa,
      b_capa,
      c_tipo,
      c_url,
      c_servicio,
      c_url_seleccionado,
      b_geoportal,
      c_nombre_esquema,
      estilos
    } = req.body;
    const {id,id_rol} = req.user;
    try {
      const capas = await capasService.RegistrarCapas(
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
        id,
        id_rol,
        c_url_seleccionado,
        b_geoportal,
        c_nombre_esquema,
        estilos
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
      c_workspace,
      b_geoportal,
      b_capa,
      c_tipo,
      c_url,
      c_servicio,
      c_url_seleccionado,
      c_sql_capa,
      c_nombre_esquema,
      estilos
    } = req.body;
    const {id,id_rol} = req.user;
    try {
      const capas = await capasService.ActualizarCapas(
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
        id,
        id_rol,
        c_url_seleccionado,
        c_sql_capa,
        c_nombre_esquema,
        estilos
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
      if (idccpp.length==0) {
        res.status(200).json({ status: "success", data: [] });
        return;
      }
      const ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
      const respuesta = await capasService.filtroAfiliadosArea(
        ccppFormato
      );
      res.status(200).json({ status: "success", data: respuesta });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async filtroCCPPDatosGeneralArea(req, res) {
    const { idccpp } = req.body;
    try {
      if (idccpp.length==0) {
        res.status(200).json({ status: "success", data: [] });
        return;
      }
      const ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
      const respuesta = await capasService.filtroCCPPDatosGeneralArea(
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
      if (idccpp.length==0) {
        res.status(200).json({ status: "success", data: [] });
        return;
      }
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
          where = "cp.idccpp_21 in ("+ccppFormato+")"
          leftjoin = 'espaciales.eess as nomb on nomb."código_ú" = espaciales.ccpp_eess_total_atributos.codigo_eess'
          nombEst = "nombre_del"
          break;
        case "E":
          tabla = "ccpp_iiee_total_atributos"
          ccppFormato = idccpp.map(item => `'${item}'`).join(', ');
          where = "cp.idccpp_21 in ("+ccppFormato+")"
          leftjoin = 'espaciales.iiee as nomb on nomb."vcodlocal" = espaciales.ccpp_iiee_total_atributos.codlocal_iiee'
          nombEst = "vinseducat"
        break;
        default:
          break;
      }
      const respuesta = await capasService.filtroServiciosAreaNoCob(
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
    // Función local para generar fecha - se define más abajo
    
    function acortarTexto(texto, longitudMaxima) {
      if (texto.length > longitudMaxima) {
        return texto.substring(0, longitudMaxima - 3) + "...";
      } else {
        return texto;
      }
    }

    function generarFechaReporte() {
      try {
        const ahora = new Date();
        
        // Crear fecha en zona horaria de Lima
        const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
        
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const dia = fechaLima.getDate().toString().padStart(2, '0');
        const mes = meses[fechaLima.getMonth()];
        const año = fechaLima.getFullYear();
        const hora = fechaLima.getHours().toString().padStart(2, '0');
        const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
        
        return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
      } catch (error) {
        console.error('Error en generarFechaReporte:', error);
        return 'Fecha de generación no disponible';
      }
    }

  const { table, datosCapas, datosCapitales } = req.body;
    try {
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Resumen General");
      worksheet.columns = [
        { key: "A", width: 40 },
        { key: "B", width: 60 },
        { key: "C", width: 30 },
        { key: "D", width: 25 }
      ];

      // Título y subtítulo desde el body o valores por defecto
      const titulo = req.body.titulo || '';
  const subtitulo = req.body.subtitulo;

      // Título principal (A1:B1)
      worksheet.mergeCells('A1:B1');
      worksheet.getCell('A1').value = titulo;
      worksheet.getCell('A1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
      worksheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }
      };
      worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

      // Subtítulo (A2:B2) solo si existe
      if (subtitulo) {
        worksheet.mergeCells('A2:B2');
        worksheet.getCell('A2').value = subtitulo;
        worksheet.getCell('A2').font = { bold: true, size: 12, color: { argb: '000000' } };
        worksheet.getCell('A2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '5B9BD5' }
        };
        worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      }

      // Fila vacía (A3)
      worksheet.getCell('A3').value = '';

      // Datos generales desde la fila 4
      worksheet.getCell('A4').value = 'Datos generales de la consulta:';
      worksheet.getCell('A4').font = { bold: true };

      worksheet.getCell('A5').value = 'Departamento:';
  worksheet.getCell('A5').font = { bold: true };
  worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B5').font = { color: { argb: 'FFFFFF' } };
      let departamento = '';
      let provincia = '';
      let distrito = '';
      if (Array.isArray(req.body.ubigeo)) {
        req.body.ubigeo.forEach(item => {
          if (item.tipo === 'departamento') departamento = item.nombre;
          if (item.tipo === 'provincia') provincia = item.nombre;
          if (item.tipo === 'distrito') distrito = item.nombre;
        });
      }
      worksheet.getCell('B5').value = departamento || req.body.departamento || '';
      worksheet.getCell('A6').value = 'Provincia:';
  worksheet.getCell('A6').font = { bold: true };
  worksheet.getCell('A6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B6').font = { color: { argb: 'FFFFFF' } };
      worksheet.getCell('B6').value = provincia || req.body.provincia || '';
      worksheet.getCell('A7').value = 'Distrito:';
  worksheet.getCell('A7').font = { bold: true };
  worksheet.getCell('A7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
  worksheet.getCell('B7').font = { color: { argb: 'FFFFFF' } };
      worksheet.getCell('B7').value = distrito || req.body.distrito || '';
      worksheet.getCell('A8').value = '';
      worksheet.getCell('B8').value = '';

      let currentRow = 9;
      // Si datosCapitales existe y tiene datos, reemplazar la tabla principal
      if (Array.isArray(datosCapitales) && datosCapitales.length > 0) {
        // Encabezado Capital
        worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = datosCapitales[0]?.label || 'Capital';
        worksheet.getCell(`A${currentRow}`).font = { bold: true };
        currentRow++;
        // Campos uno y dos
        worksheet.getCell(`A${currentRow}`).value = datosCapitales[1]?.label || 'Capital (Destino):';
        worksheet.getCell(`B${currentRow}`).value = datosCapitales[2]?.label || '';
        currentRow += 2;
      } else {
        // ...tabla original...
        // Encabezados dinámicos desde columnasCapas
        const columnasCapas = Array.isArray(req.body.columnasCapas) ? req.body.columnasCapas : [
          { tipo: 'campouno', label: 'Programa Social' },
          { tipo: 'campodos', label: 'Servicios' }
        ];
        const colHeaders = ['A', 'B', 'C'];
        const tituloColumna = columnasCapas.find(col => col.tipo === 'titulo');
        const columnasSinTitulo = columnasCapas.filter(col => col.tipo !== 'titulo');
        const numCols = columnasSinTitulo.length;
        if (tituloColumna && numCols > 0) {
          const startCol = colHeaders[0];
          const lastCol = colHeaders[numCols - 1] || 'B';
          worksheet.mergeCells(`${startCol}${currentRow}:${lastCol}${currentRow}`);
          worksheet.getCell(`${startCol}${currentRow}`).value = tituloColumna.label;
          worksheet.getCell(`${startCol}${currentRow}`).font = { bold: true };
        }
        currentRow++;
        // Encabezados de la tabla
        let headerRow = currentRow;
        columnasSinTitulo.forEach((col, idx) => {
          if (colHeaders[idx]) {
            worksheet.getCell(`${colHeaders[idx]}${headerRow}`).value = col.label;
            worksheet.getCell(`${colHeaders[idx]}${headerRow}`).font = { bold: true, color: { argb: 'FFFFFF' } };
            worksheet.getCell(`${colHeaders[idx]}${headerRow}`).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '4472C4' }
            };
          }
        });
        currentRow++;
        // Agregar los datos empezando desde la fila siguiente
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
        exportarTemp.forEach(item => {
          columnasSinTitulo.forEach((col, idx) => {
            if (colHeaders[idx]) {
              worksheet.getCell(`${colHeaders[idx]}${currentRow}`).value = item[idx + 1] || '';
            }
          });
          currentRow++;
        });
        // Fila vacía adicional para espaciado visual
        worksheet.getCell(`A${currentRow}`).value = '';
        worksheet.getCell(`B${currentRow}`).value = '';
        currentRow++;
      }

      // Agregar separador y sección de Cartografía base - color azul como el título
      worksheet.getCell(`A${currentRow}`).value = 'Cartografía base';
      worksheet.getCell(`A${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' } };
      worksheet.getCell(`A${currentRow}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }
      };

      worksheet.getCell(`B${currentRow}`).value = 'Cantidad';
      worksheet.getCell(`B${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' } };
      worksheet.getCell(`B${currentRow}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }
      };

      currentRow++;
      if (req.body.cantidadCentrosPoblados) {
        worksheet.getCell(`A${currentRow}`).value = 'Centros poblados';
        worksheet.getCell(`B${currentRow}`).value = 32;
        currentRow += 2;
      }

      worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
      worksheet.getCell(`A${currentRow}`).value = 'Fuente:';
      worksheet.getCell(`A${currentRow}`).font = { bold: true, italic: true };
      worksheet.getCell(`A${currentRow}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEB9C' }
      };

      if (Array.isArray(req.body.fuentes)) {
        req.body.fuentes.forEach(fuente => {
          currentRow++;
          worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
          worksheet.getCell(`A${currentRow}`).value = fuente;
          worksheet.getCell(`A${currentRow}`).font = { italic: true };
          worksheet.getCell(`A${currentRow}`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEB9C' }
          };
          worksheet.getCell(`A${currentRow}`).alignment = { 
            wrapText: true,
            vertical: 'top'
          };
        });
      }

      currentRow++;
      worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
      worksheet.getCell(`A${currentRow}`).value = generarFechaReporte();
      worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true };
      worksheet.getCell(`A${currentRow}`).alignment = { 
        wrapText: true,
        vertical: 'top'
      };

      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.font = { ...cell.font, name: 'Arial Narrow', size: 10 };
        });
      });
      // Reaplicar tamaño 12 solo al título
      worksheet.getCell('A1').font = { ...worksheet.getCell('A1').font, name: 'Arial Narrow', size: 12, bold: true, color: { argb: 'FFFFFF' } };

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
              fgColor: { argb: "4472C4" }, // Cambiado a azul para coincidir con la primera página
            };
            // Agregar texto en blanco para mejor contraste
            worksheet.getCell(celda[0].celda).font = { 
              bold: true, 
              color: { argb: 'FFFFFF' } 
            };
          }
        }
        worksheet.addRows(exportarTempo);
        // Aplicar fuente Arial Narrow a toda la hoja
        worksheet.eachRow((row) => {
          row.eachCell((cell) => {
            cell.font = { ...cell.font, name: 'Arial Narrow', size: 10};
          });
        });
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Visor_Geografico_Resumen.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

async descargarExcelUbigeo(req, res) {
  function acortarTexto(texto, longitudMaxima) {
    if (texto.length > longitudMaxima) {
      return texto.substring(0, longitudMaxima - 3) + "...";
    } else {
      return texto;
    }
  }

  function generarFechaReporte() {
    try {
      const ahora = new Date();
      const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const dia = fechaLima.getDate().toString().padStart(2, '0');
      const mes = meses[fechaLima.getMonth()];
      const año = fechaLima.getFullYear();
      const hora = fechaLima.getHours().toString().padStart(2, '0');
      const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
      return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
    } catch (error) {
      return 'Fecha de generación no disponible';
    }
  }

  const { table, datosCapas } = req.body;
  try {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Resumen General");
    worksheet.columns = [
      { key: "A", width: 40 },
      { key: "B", width: 40 },
      { key: "C", width: 25 }
    ];

    // Título principal (A1:C1)
    const titulo = req.body.titulo || '';
    worksheet.mergeCells('A1:C1');
    worksheet.getCell('A1').value = titulo;
    worksheet.getCell('A1').font = { bold: true, size: 12, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4472C4' }
    };
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

    // Datos generales
    worksheet.getCell('A2').value = 'Departamento:';
    worksheet.getCell('A2').font = { bold: true, name: 'Arial Narrow' };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('C2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B2').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('C2').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('B2').value = req.body.ubigeo?.filter(ubigeo => ubigeo.tipo === 'departamento').map(ubigeo => ubigeo.nombre)?.[0] || '';

    worksheet.getCell('A3').value = 'Provincia:';
    worksheet.getCell('A3').font = { bold: true, name: 'Arial Narrow' };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('C3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B3').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('C3').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('B3').value = req.body.ubigeo?.filter(ubigeo => ubigeo.tipo === 'provincia').map(ubigeo => ubigeo.nombre)?.[0] || '';

    worksheet.getCell('A4').value = 'Distrito:';
    worksheet.getCell('A4').font = { bold: true, name: 'Arial Narrow' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('C4').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell('B4').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('C4').font = { name: 'Arial Narrow', color: { argb: 'FFFFFF' } };
    worksheet.getCell('B4').value = req.body.ubigeo?.filter(ubigeo => ubigeo.tipo === 'distrito').map(ubigeo => ubigeo.nombre)?.[0] || '';

    let currentRow = 6;
    // Encabezados de la tabla principal
    worksheet.getCell(`A${currentRow}`).value = 'Programa Social';
    worksheet.getCell(`A${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell(`B${currentRow}`).value = 'Nombre de capa';
    worksheet.getCell(`B${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`B${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell(`C${currentRow}`).value = 'Número de usuarios y/o locales';
    worksheet.getCell(`C${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`C${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };

    currentRow++;
    // Agregar los datos de la tabla principal
    for (const item of table) {
      worksheet.getCell(`A${currentRow}`).value = item.grupo || '';
      worksheet.getCell(`B${currentRow}`).value = item.titulo || '';
      worksheet.getCell(`C${currentRow}`).value = item.cantidad || '';
      worksheet.getCell(`A${currentRow}`).font = { name: 'Arial Narrow', size: 10 };
      worksheet.getCell(`B${currentRow}`).font = { name: 'Arial Narrow', size: 10 };
      worksheet.getCell(`C${currentRow}`).font = { name: 'Arial Narrow', size: 10 };
      currentRow++;
    }
    // Espacio visual antes de Cartografía base
    worksheet.getCell(`A${currentRow}`).value = '';
    worksheet.getCell(`B${currentRow}`).value = '';
    worksheet.getCell(`C${currentRow}`).value = '';
    currentRow++;

    // Cartografía base
    worksheet.getCell(`A${currentRow}`).value = 'Cartografía base';
    worksheet.getCell(`A${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell(`B${currentRow}`).value = 'Nombre de capa';
    worksheet.getCell(`B${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`B${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
    worksheet.getCell(`C${currentRow}`).value = 'Cantidad';
    worksheet.getCell(`C${currentRow}`).font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
    worksheet.getCell(`C${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };

    currentRow++;
    // Datos de cartografía base
    worksheet.getCell(`A${currentRow}`).value = 'Centros poblados';
    worksheet.getCell(`B${currentRow}`).value = 'Centros poblados';
    worksheet.getCell(`C${currentRow}`).value = req.body.cantidadCentrosPoblados || '';
    worksheet.getCell(`A${currentRow}`).font = { name: 'Arial Narrow', size: 10 };
    worksheet.getCell(`B${currentRow}`).font = { name: 'Arial Narrow', size: 10 };
    worksheet.getCell(`C${currentRow}`).font = { name: 'Arial Narrow', size: 10 };

    currentRow += 2;
    // Fuente
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    worksheet.getCell(`A${currentRow}`).value = 'Fuente:';
    worksheet.getCell(`A${currentRow}`).font = { bold: true, italic: true, name: 'Arial Narrow' };
    worksheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEB9C' } };

    if (Array.isArray(req.body.fuentes)) {
      req.body.fuentes.forEach(fuente => {
        currentRow++;
        worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
        worksheet.getCell(`A${currentRow}`).value = fuente;
        worksheet.getCell(`A${currentRow}`).font = { italic: true, name: 'Arial Narrow' };
        worksheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEB9C' } };
        worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true, vertical: 'top' };
      });
    }

    currentRow++;
    worksheet.mergeCells(`A${currentRow}:C${currentRow}`);
    worksheet.getCell(`A${currentRow}`).value = generarFechaReporte();
    worksheet.getCell(`A${currentRow}`).font = { italic: true, bold: true, name: 'Arial Narrow' };
    worksheet.getCell(`A${currentRow}`).alignment = { wrapText: true, vertical: 'top' };

    // Crear una pestaña por cada datosCapas
    if (Array.isArray(datosCapas)) {
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
        let titulo = (element.grupo ? element.grupo + ' ' : '') + (element.capa || '');
        titulo = acortarTexto(titulo, 31);
        if (nombresExistentes.includes(titulo)) {
          titulo = nombreUnico(nombresExistentes, titulo);
          nombresExistentes.push(titulo);
        } else {
          nombresExistentes.push(titulo);
        }
        let hoja = workbook.addWorksheet(titulo);
        const data = element.rows;
        const columnas = element.campos;
        hoja.columns = columnas.map(col => ({ header: col, key: col, width: 25 }));
        // Pintar encabezados
        columnas.forEach((col, idx) => {
          const cell = hoja.getCell(1, idx + 1);
          cell.font = { bold: true, color: { argb: 'FFFFFF' }, name: 'Arial Narrow' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
        });
        // Agregar datos
        data.forEach((row, i) => {
          columnas.forEach((col, idx) => {
            hoja.getCell(i + 2, idx + 1).value = row[col];
            hoja.getCell(i + 2, idx + 1).font = { name: 'Arial Narrow', size: 10 };
          });
        });
      });
    }

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "Visor_Geografico_Ubigeo.xlsx"
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
    const { tipoServicio,categoria,distancia,nivel,idccpp,datosResumen} = req.body;
    const titulo = 'Filtro demanda.'

    function generarFechaReporte() {
      try {
        const ahora = new Date();
        
        // Crear fecha en zona horaria de Lima
        const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
        
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const dia = fechaLima.getDate().toString().padStart(2, '0');
        const mes = meses[fechaLima.getMonth()];
        const año = fechaLima.getFullYear();
        const hora = fechaLima.getHours().toString().padStart(2, '0');
        const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
        
        return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
      } catch (error) {
        console.error('Error en generarFechaReporte:', error);
        return 'Fecha de generación no disponible';
      }
    }

    try {
      let workbook = new excel.Workbook();
      let worksheetRG = workbook.addWorksheet('Resumen general.');
      worksheetRG.columns = [
        { key: 'A', width: 30 },
        { key: 'B', width: 30 },
        { key: 'C', width: 30 },
        { key: 'D', width: 30 },
        { key: 'E', width: 30 },
        { key: 'F', width: 30 }
      ];
      // Título principal (A1:F1)
      worksheetRG.mergeCells('A1:F1');
      worksheetRG.getCell('A1').value = 'Análisis de la demanda por área geográfica';
      worksheetRG.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheetRG.getCell('A1').font = { bold: true, color: { argb: 'FFFFFF' }, size: 12, name: 'Arial Narrow' };
      worksheetRG.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1F4E78' }
      };
      worksheetRG.getRow(1).height = 25;

      // Subtítulo (A2:F2)
      worksheetRG.mergeCells('A2:F2');
      worksheetRG.getCell('A2').value = 'Cobertura de Servicios de Educación públicos nivel secundaria dentro de 10 km / 2 horas';
      worksheetRG.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheetRG.getCell('A2').font = { bold: true, color: { argb: '000000' }, size: 10, name: 'Arial Narrow' };
      worksheetRG.getCell('A2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A9C4E5' }
      };
      worksheetRG.getRow(2).height = 22;

      worksheetRG.mergeCells('A4:E4');
      worksheetRG.getCell("A4").value = 'Datos generales de los centros poblados e instituciones educativas en consulta:';
  worksheetRG.getCell('A4').alignment = { vertical: 'middle', horizontal: 'left' };
  worksheetRG.getCell('A4').font = { bold: true, name: 'Arial Narrow', size: 10 };

      console.log(datosResumen.tipoDibujoActual,'tipo poligono?');
      if (datosResumen.tipoDibujoActual != 'dibujo') {
        worksheetRG.getCell(5,1).value = 'REGIÓN:'; worksheetRG.getCell(5,2).value = datosResumen.nombreDepartamento;
        worksheetRG.getCell(6,1).value = 'PROVINCIA:'; worksheetRG.getCell(6,2).value = datosResumen.nombreProvincia;
        worksheetRG.getCell(7,1).value = 'DISTRITO:'; worksheetRG.getCell(7,2).value = datosResumen.nombreDistrito;
      }
      else {
        worksheetRG.getCell(2,1).value = 'Se dibujó un polígono';
      }
      worksheetRG.getCell(8,1).value = 'N° de centros poblados:'; worksheetRG.getCell(8,2).value = datosResumen.conteoTotalCCPP.toString();
      worksheetRG.getCell(9,1).value = 'Población total (censada):'; worksheetRG.getCell(9,2).value = datosResumen.conteoPoblacionTotal.toString();
      worksheetRG.getCell(10,1).value = tipoServicio == "S" ?'N° de establecimientos de salud:':'N° de instituciones educativas:'; worksheetRG.getCell(10,2).value = datosResumen.conteoEstablecimientos.toString();
      for (let i = 5; i <= 10; i++) {
        worksheetRG.getCell(i,1).font = { name: 'Arial Narrow', size: 10 };
        worksheetRG.getCell(i,2).font = { name: 'Arial Narrow', size: 10 };
      }
      worksheetRG.mergeCells('A12:E12');
      worksheetRG.getCell("A12").value = datosResumen.conteoTotalCCPP + ' centros poblados (' + datosResumen.porcePoblacion +'%) y ' + datosResumen.conteoPersoCober +' personas (' + datosResumen.porcePersoCober +'%) tienen cobertura de servicio'
      worksheetRG.getCell('A12').alignment = { vertical: 'middle', horizontal: 'left' };
  worksheetRG.getCell('A12').font = { bold: true, name: 'Arial Narrow', size: 10 };
      // console.log(datosResumen.newDataTable,'data resumen?');
      const tablaResumen = datosResumen.newDataTable.map(item => ({
        "1": item.nombre,
        "2": item.cantidad
      }));

      const borderStyles = {
        top: { style: 'thin', color: { argb: '61c5c0' } },
        left: { style: 'thin', color: { argb: '61c5c0' } },
        bottom: { style: 'thin', color: { argb: '61c5c0' } },
        right: { style: 'thin', color: { argb: '61c5c0' } }
      };
    
      // Agregar los datos de resumen y aplicar bordes verdes a cada celda
      tablaResumen.forEach((row, index) => {
        const rowIndex = index + 13; // Fila 13 en adelante
        worksheetRG.getCell(`A${rowIndex}`).value = row["1"];
        worksheetRG.getCell(`B${rowIndex}`).value = row["2"];
        worksheetRG.getCell(`A${rowIndex}`).border = borderStyles;
        worksheetRG.getCell(`B${rowIndex}`).border = borderStyles;
        worksheetRG.getCell(`A${rowIndex}`).font = { name: 'Arial Narrow', size: 10 };
        worksheetRG.getCell(`B${rowIndex}`).font = { name: 'Arial Narrow', size: 10 };
      });
      const tablaDatosCercanos = datosResumen.newDataTableCercanos.map(item => ({
        "1": item.ubigeo,
        "2": item.nombccpp,
        "3": item.nombre,
        "4": item.codigo,
        "5": item.tipo,
        "6": item.kil,
      })); 
      const borderStylesCercanos = {
        top: { style: 'thin', color: { argb: '0070f0' } },
        left: { style: 'thin', color: { argb: '0070f0' } },
        bottom: { style: 'thin', color: { argb: '0070f0' } },
        right: { style: 'thin', color: { argb: '0070f0' } }
      };
      worksheetRG.mergeCells('A22:E22');
      worksheetRG.getCell('A22').value = tipoServicio == "S"
        ? 'Los establecimientos de salud más cercanos a los centros poblados son:'
        : 'Las instituciones educativas más cercanas a los centros poblados son:';
  worksheetRG.getCell('A22').font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheetRG.getCell(23,1).value = 'IDCCPP'
      worksheetRG.getCell(23,2).value = 'Nombre de centro poblado'
      worksheetRG.getCell(23,3).value = 'Código ' + (tipoServicio == "S" ? 'EE.SS.':'modular')
      worksheetRG.getCell(23,4).value = 'Nombre de ' + (tipoServicio == "S" ? 'establecimiento de salud':'institución educativa')
      worksheetRG.getCell(23,5).value = tipoServicio == "S" ? 'Categoría':'Nivel'
      worksheetRG.getCell(23,6).value = 'Kilómetro(s)/minuto(s)'
      worksheetRG.getCell(23,1).border = borderStylesCercanos
      worksheetRG.getCell(23,2).border = borderStylesCercanos
      worksheetRG.getCell(23,3).border = borderStylesCercanos
      worksheetRG.getCell(23,4).border = borderStylesCercanos
      worksheetRG.getCell(23,5).border = borderStylesCercanos
      worksheetRG.getCell(23,6).border = borderStylesCercanos
      for (let i = 1; i <= 6; i++) {
        worksheetRG.getCell(23,i).font = { bold: true, name: 'Arial Narrow', size: 10 };
      }
      // Agregar los datos de resumen y aplicar bordes verdes a cada celda
      tablaDatosCercanos.forEach((row, index) => {
        const rowIndex = index + 24; // Fila 23 en adelante
        worksheetRG.getCell(`A${rowIndex}`).value = row["1"];
        worksheetRG.getCell(`B${rowIndex}`).value = row["2"];
        worksheetRG.getCell(`C${rowIndex}`).value = row["3"];
        worksheetRG.getCell(`D${rowIndex}`).value = row["4"];
        worksheetRG.getCell(`E${rowIndex}`).value = row["5"];
        worksheetRG.getCell(`F${rowIndex}`).value = row["6"];
        for (let i = 1; i <= 6; i++) {
          worksheetRG.getCell(rowIndex, i).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
          worksheetRG.getCell(rowIndex, i).font = { name: 'Arial Narrow', size: 10 };
          worksheetRG.getCell(rowIndex, i).border = borderStylesCercanos;
        }
      });

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
      const fuenteStartRow = tablaDatosCercanos.length + 25;
      worksheetRG.mergeCells(`A${fuenteStartRow}:F${fuenteStartRow + 4}`);
      worksheetRG.getCell(`A${fuenteStartRow}`).value =
        "Fuente:\nPlataforma de Estadística de la Calidad Educativa (ESCALE), 2023.\nRegistro Nacional de Instituciones Prestadoras de Servicios de Salud (RENIPRESS), 2024.\nCentros poblados del Instituto Nacional de Estadística e Informática (INEI), 2023.\nProgramas Nacionales del Ministerio de Desarrollo e Inclusión Social (MIDIS), 2024.";
      worksheetRG.getCell(`A${fuenteStartRow}`).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      worksheetRG.getCell(`A${fuenteStartRow}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF9E5' }
      };
  worksheetRG.getCell(`A${fuenteStartRow}`).font = { italic: true, color: { argb: '000000' }, size: 10, name: 'Arial Narrow' };

      // Agregar la fecha en una fila separada sin fondo amarillo
      const fechaRow = fuenteStartRow + 5;
      worksheetRG.mergeCells(`A${fechaRow}:F${fechaRow}`);
      worksheetRG.getCell(`A${fechaRow}`).value = generarFechaReporte();
  worksheetRG.getCell(`A${fechaRow}`).font = { italic: true, bold: true, name: 'Arial Narrow', size: 10 };
      worksheetRG.getCell(`A${fechaRow}`).alignment = { 
        vertical: 'top', 
        horizontal: 'left',
        wrapText: true 
      };

      let worksheet = workbook.addWorksheet('Tabla de atributos.');
  const columnas = [];
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
          size: 10,
          name: 'Arial Narrow'
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
          size: 10,
          name: 'Arial Narrow'
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      worksheet.addRows(datosExcel);
      // Aplicar Arial Narrow 10 a todos los datos
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.font = { ...cell.font, name: 'Arial Narrow', size: 10 };
        });
      });

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
      console.log({
        status: "error",
        message: "Error en el servidor " + error,
      });
      res.json({
        status: "error",
        message: "Error en el servidor " + error,
      });
    }
  }

  async descargarExcelFiltrosCCPP(req, res) {
    const { tipoServicio, datosResumen } = req.body;
    const titulo = 'Filtro demanda';
    // console.log(datosResumen,'datos resumen');

    function generarFechaReporte() {
      try {
        const ahora = new Date();
        
        // Crear fecha en zona horaria de Lima
        const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
        
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const dia = fechaLima.getDate().toString().padStart(2, '0');
        const mes = meses[fechaLima.getMonth()];
        const año = fechaLima.getFullYear();
        const hora = fechaLima.getHours().toString().padStart(2, '0');
        const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
        
        return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
      } catch (error) {
        console.error('Error en generarFechaReporte:', error);
        return 'Fecha de generación no disponible';
      }
    }

    try {
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('Resumen general');

      // Título principal (A1:B1)
      worksheet.mergeCells('A1:B1');
      worksheet.getCell('A1').value = 'Análisis de la Demanda por Centro Poblado';
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('A1').font = { bold: true, color: { argb: 'FFFFFF' }, size: 12, name: 'Arial Narrow' };
      worksheet.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1F4E78' }
      };
      worksheet.getRow(1).height = 30;

      // Subtítulo (A2:B2)
      worksheet.mergeCells('A2:B2');
      worksheet.getCell('A2').value = `Cobertura de Servicios de ${tipoServicio === "S" ? "Establecimiento de Salud (E.S.)" : "Institución Educativa (I.E.E.)"} públicos de nivel ${datosResumen.nivelSeleccionado || datosResumen.selectedCategorias} dentro de ${datosResumen.labelDistanciaSeleccionado}`;
      worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('A2').font = { bold: true, color: { argb: '000000' }, size: 10, name: 'Arial Narrow' };
      worksheet.getCell('A2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5B9BD5' }
      };
      worksheet.getRow(2).height = 40;

      // Datos generales
      worksheet.getCell('A4').value = 'Datos generales del centro poblado en consulta:';
  worksheet.getCell('A4').font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'left' };

      worksheet.getCell('A5').value = 'Departamento:';
      worksheet.getCell('B5').value = datosResumen.nombreDepartamento;
      worksheet.getCell('A6').value = 'Provincia:';
      worksheet.getCell('B6').value = datosResumen.nombreProvincia;
      worksheet.getCell('A7').value = 'Distrito:';
      worksheet.getCell('B7').value = datosResumen.nombreDistrito;
      worksheet.getCell('A8').value = 'Código de centro poblado:';
      worksheet.getCell('B8').value = datosResumen.selectedCCPP;
      worksheet.getCell('A9').value = 'Nombre de centro poblado:';
      worksheet.getCell('B9').value = datosResumen.nombreCCPP;
      worksheet.getCell('A10').value = 'Cobertura total de servicios ' + (tipoServicio === "S" ? "de salud:": "educativos:");
      worksheet.getCell('B10').value = datosResumen.numeroEstablecimientos.toString();
      for (let i = 5; i <= 10; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }

      // Indicadores censales
      worksheet.getCell('A12').value = 'Indicadores censales del centro poblado (Censo INEI, 2017):';
  worksheet.getCell('A12').font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell('A12').alignment = { vertical: 'middle', horizontal: 'left' };

      worksheet.getCell('A13').value = 'Población Total';
      worksheet.getCell('B13').value = datosResumen.conteoPoblacionTotal;
      worksheet.getCell('A14').value = 'Población de 3 a 5 años';
      worksheet.getCell('B14').value = datosResumen.pob_3_5a;
      worksheet.getCell('A15').value = 'Población de 6 a 11 años';
      worksheet.getCell('B15').value = datosResumen.pob_6_11a;
      worksheet.getCell('A16').value = 'Población de 12 a 16 años';
      worksheet.getCell('B16').value = datosResumen.pob_12_16a;
      worksheet.getCell('A17').value = 'Hogares afiliados juntos';
      worksheet.getCell('B17').value = datosResumen.hogaresAfiliadosJuntos;
      for (let i = 13; i <= 17; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }

      // Oferta educativa más cercana
      worksheet.getCell('A19').value = 'Oferta educativa más cercana al centro poblado de interés:';
  worksheet.getCell('A19').font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell('A19').alignment = { vertical: 'middle', horizontal: 'left' };

      worksheet.getCell('A20').value = `La I.E. más cercana:`;
      worksheet.getCell('B20').value = datosResumen.campoCercano;
      worksheet.getCell('A21').value = `Código modular de la I.E.:`;
      worksheet.getCell('B21').value = datosResumen.codigoEs;
      worksheet.getCell('A22').value = `Nivel de la I.E.:`;
      worksheet.getCell('B22').value = datosResumen.categoriaEs;
      worksheet.getCell('A23').value = `Localizado a:`;
      worksheet.getCell('B23').value = datosResumen.distanciaLocalizado;
      for (let i = 20; i <= 23; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }

      // Fuente
      worksheet.mergeCells('A25:B29');
      worksheet.getCell('A25').value = 'Fuente:\nPlataforma de Estadística de la Calidad Educativa (ESCALE), 2023.\nRegistro Nacional de Instituciones Prestadoras de Servicios de Salud (RENIPRESS), 2024.\nCentros poblados del Instituto Nacional de Estadística e Informática (INEI), 2023.\nProgramas Nacionales del Ministerio de Desarrollo e Inclusión Social (MIDIS), 2025.';
      worksheet.getCell('A25').alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      worksheet.getCell('A25').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF9E5' }
      };
  worksheet.getCell('A25').font = { italic: true, color: { argb: '000000' }, size: 10, name: 'Arial Narrow' };

      // Agregar la fecha en una fila separada sin fondo amarillo
      worksheet.mergeCells('A30:B30');
      worksheet.getCell('A30').value = generarFechaReporte();
  worksheet.getCell('A30').font = { italic: true, bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell('A30').alignment = { 
        vertical: 'top', 
        horizontal: 'left',
        wrapText: true 
      };

      // Ajustar ancho de columnas
      worksheet.columns = [
        { key: 'A', width: 35 },
        { key: 'B', width: 35 }
      ];

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${titulo}.xlsx`
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

  async descargarExcelOfertaPorServicios(req, res) {
    const {
      tipoServicio,
      departamento,
      provincia,
      distrito,
      codigo,
      nombre,
      categoria,
      coberturaTotal,
      coberturaUrbana,
      coberturaRural,
      poblacionTotal,
      hogares,
      viviendas,
      hombres,
      mujeres,
      estudiantes,
      pobMen1,
      pobMen3,
      pobMen5,
      pobMay65,
      pobDiscapacidad,
      pension65,
      contigo,
      cuna,
      juntos
    } = req.body;

    function generarFechaReporte() {
      try {
        const ahora = new Date();
        
        // Crear fecha en zona horaria de Lima
        const fechaLima = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Lima"}));
        
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const dia = fechaLima.getDate().toString().padStart(2, '0');
        const mes = meses[fechaLima.getMonth()];
        const año = fechaLima.getFullYear();
        const hora = fechaLima.getHours().toString().padStart(2, '0');
        const minutos = fechaLima.getMinutes().toString().padStart(2, '0');
        
        return `Generado el ${dia} de ${mes} de ${año}, a las ${hora}:${minutos}H`;
      } catch (error) {
        console.error('Error en generarFechaReporte:', error);
        return 'Fecha de generación no disponible';
      }
    }

    try {
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Oferta por Servicios");
      worksheet.columns = [
        { key: "A", width: 40 },
        { key: "B", width: 40 },
        { key: "C", width: 25 },
        { key: "D", width: 25 },
        { key: "E", width: 25 }
      ];
      // Título principal
      worksheet.mergeCells("A1:B1");
      worksheet.getCell("A1").value = "Análisis de la Oferta por Servicios";
      worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getCell("A1").font = { bold: true, color: { argb: "FFFFFF" }, size: 12, name: 'Arial Narrow' };
      worksheet.getCell("A1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }
      };
      worksheet.getRow(1).height = 40;
      // Subtítulo (solo hasta B)
      worksheet.mergeCells("A2:B2");
      worksheet.getCell("A2").value = tipoServicio === "S" 
        ? "Centros poblados con cobertura de servicios de Establecimientos de Salud (EE.SS.) públicos dentro del rango de 10 km / 2 horas"
        : "Centros poblados con cobertura de servicios de Institución Educativas (II.EE.) públicos de nivel secundaria dentro del rango de 10 km / 2 horas";
      worksheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      worksheet.getCell("A2").font = { bold: true, color: { argb: "000000" }, size: 10, name: 'Arial Narrow' };
      worksheet.getCell("A2").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "A9C4E5" }
      };
      worksheet.getRow(2).height = 40;
      // Datos generales
      worksheet.getCell("A4").value = "Datos generales:";
      worksheet.getCell("A4").font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell("A5").value = "Departamento:";
      worksheet.getCell("B5").value = departamento;
      worksheet.getCell("A6").value = "Provincia:";
      worksheet.getCell("B6").value = provincia;
      worksheet.getCell("A7").value = "Distrito:";
      worksheet.getCell("B7").value = distrito;
      worksheet.getCell("A8").value = tipoServicio === "S" ? "Código único de la EE.SS.:" : "Código modular de la II.EE.:",
      worksheet.getCell("B8").value = codigo;
      worksheet.getCell("A9").value = tipoServicio === "S" ? "Nombre de la EE.SS.:" : "Nombre de la II.EE.:";
      worksheet.getCell("B9").value = nombre;
      worksheet.getCell("A10").value = "Categoría:";
      worksheet.getCell("B10").value = categoria;
      worksheet.getCell("A11").value = "Cobertura total de centros poblados:";
      worksheet.getCell("B11").value = coberturaTotal;
      worksheet.getCell("A12").value = "Centros poblados urbanos:";
      worksheet.getCell("B12").value = coberturaUrbana;
      worksheet.getCell("A13").value = "Centros poblados rurales:";
      worksheet.getCell("B13").value = coberturaRural;
      for (let i = 5; i <= 13; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }
      worksheet.getCell("A15").value = "Población dentro del área de influencia (censo 2017):";
      worksheet.getCell("A15").font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell("A16").value = "Población total";
      worksheet.getCell("B16").value = poblacionTotal;
      worksheet.getCell("A17").value = "Hogares";
      worksheet.getCell("B17").value = hogares;
      worksheet.getCell("A18").value = "Viviendas";
      worksheet.getCell("B18").value = viviendas;
      worksheet.getCell("A19").value = "Hombres";
      worksheet.getCell("B19").value = hombres;
      worksheet.getCell("A20").value = "Mujeres";
      worksheet.getCell("B20").value = mujeres;
      worksheet.getCell("A21").value = "Estudiantes en edad escolar";
      worksheet.getCell("B21").value = estudiantes;
      worksheet.getCell("A22").value = "Población <1 año (P. Nominal)";
      worksheet.getCell("B22").value = pobMen1;
      worksheet.getCell("A23").value = "Población <3 años (P. Nominal)";
      worksheet.getCell("B23").value = pobMen3;
      worksheet.getCell("A24").value = "Población <5 años (P. Nominal)";
      worksheet.getCell("B24").value = pobMen5;
      worksheet.getCell("A25").value = "Población >65 años (P. Nominal)";
      worksheet.getCell("B25").value = pobMay65;
      worksheet.getCell("A26").value = "Población con discapacidad";
      worksheet.getCell("B26").value = pobDiscapacidad;
      for (let i = 16; i <= 26; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }
      worksheet.getCell("A28").value = "Intervención de los programas sociales del área de influencia:";
      worksheet.getCell("A28").font = { bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell("A29").value = "Usuarios Pensión 65";
      worksheet.getCell("B29").value = pension65;
      worksheet.getCell("A30").value = "Usuarios de Contigo";
      worksheet.getCell("B30").value = contigo;
      worksheet.getCell("A31").value = "Beneficiarios Cuna Más SAF";
      worksheet.getCell("B31").value = cuna;
      worksheet.getCell("A32").value = "Hogares afiliados de Juntos";
      worksheet.getCell("B32").value = juntos;
      for (let i = 29; i <= 32; i++) {
        worksheet.getCell(`A${i}`).font = { name: 'Arial Narrow', size: 10 };
        worksheet.getCell(`B${i}`).font = { name: 'Arial Narrow', size: 10 };
      }
      worksheet.mergeCells("A34:B38");
      worksheet.getCell("A34").value =
        "Fuente:\nPlataforma de Estadística de la Calidad Educativa (ESCALE), 2023.\nRegistro Nacional de Instituciones Prestadoras de Servicios de Salud (RENIPRESS), 2024.\nCentros poblados del Instituto Nacional de Estadística e Informática (INEI), 2023.\nProgramas Nacionales del Ministerio de Desarrollo e Inclusión Social (MIDIS), 2024.";
      worksheet.getCell("A34").alignment = { vertical: "top", horizontal: "left", wrapText: true };
      worksheet.getCell("A34").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF9E5" }
      };
      worksheet.getCell("A34").font = { italic: true, color: { argb: "000000" }, size: 10, name: 'Arial Narrow' };
      worksheet.mergeCells("A39:B39");
      worksheet.getCell("A39").value = generarFechaReporte();
      worksheet.getCell("A39").font = { italic: true, bold: true, name: 'Arial Narrow', size: 10 };
      worksheet.getCell("A39").alignment = { 
        vertical: "top", 
        horizontal: "left",
        wrapText: true 
      };
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=oferta_por_servicios.xlsx`
      );
      await workbook.xlsx.write(res);
      res.status(200).end();
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

  // ===== MÉTODOS PARA VISTAS =====
  
  async getVistas(req, res) {
    try {
      const id_usuario = req.user.id; // Obtenido del validarToken
      const response = await capasService.getVistasByUsuario(id_usuario);
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async postVistas(req, res) {
    try {
      const id_usuario = req.user.id; // Obtenido del validarToken
      const vistaData = {
        ...req.body,
        id_usuario: id_usuario
      };
      const response = await capasService.createVista(vistaData);
      res.status(201).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVistas(req, res) {
    try {
      const id_usuario = req.user.id; // Obtenido del validarToken
      const { id_vista } = req.params;
      const response = await capasService.deleteVista(id_vista, id_usuario);
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}