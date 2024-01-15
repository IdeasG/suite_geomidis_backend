import "dotenv/config";

import { validatePagination } from "../../schemas/generales/pagination.js";

import { CapasService } from "../../services/espaciales/capas.js";

import { redisClient } from "../../config/redis/redis.js";

import { sequelize } from "../../config/postgres/sequelize.js";
import excel from "exceljs/dist/es5/index.js";
import zip from "shp-write/src/zip.js";
import axios from "axios";

const capasService = new CapasService();

export class CapasController {
  constructor() {}

  async getAllCapasTable(req, res) {
    try {
      const [response, metadata] = await sequelize.query(`
      select * from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'interno'
      `);
      res.status(200).json({ status: "success", data: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getAllCapasTableExterno (req, res) {
    try {
      const [response, metadata] = await sequelize.query(`
      select * from administracion.tadm_capas_supergrupo sg
      left join administracion.tadm_capas_grupo g on sg.id_super_grupo = g.id_super_grupo
      left join administracion.tadm_capas c on g.id_grupo = c.id_grupo
      where c_tipo = 'externo' 
      `);
      res.status(200).json({status: 'success', data: response});
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
    try {
      const capas = await capasService.getAllCapasInternas();
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
      id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa, c_tipo, c_url, c_servicio
    } = req.body;
    try {
      const capas = await capasService.RegistrarCapas(
        id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, c_sql_capa, b_capa, c_tipo, c_url, c_servicio
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
      id_capa, id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, b_capa, c_tipo, c_url, c_servicio
    } = req.body;
    try {
      const capas = await capasService.ActualizarCapas(
      id_capa, id_grupo, c_nombre_tabla_capa, c_nombre_public_capa, b_capa, c_tipo, c_url, c_servicio
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
    try {
      const capas = await capasService.EliminarCapas(id_capa);
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

  async getStructure(req, res) {
    try {

      const [superGrupos, metadata] = await sequelize.query(
        `select * from administracion.tadm_capas_supergrupo`
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVisibles(req, res) {
    const { id_capa } = req.params;
    try {
      let dbResponse = await capasService.getCapasVisibles(id_capa);
      if (dbResponse.length == 0) {
        const responseCreate = await capasService.postCapasVisibles(id_capa);
        // console.log(responseCreate);
        dbResponse = responseCreate;
      }
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
    const { c_extent,c_capas,c_mapa_base,c_nombre } = req.body;
    try {
      let dbResponse = await capasService.postVistas(c_extent,c_capas,c_mapa_base,c_nombre);
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async putVisibles(req, res) {
    const { campos } = req.body;
    try {
      await capasService.putCapasVisibles(campos);
      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async busquedaAvanzada(req,res) {
    const { simbolo, column, layer, inputBt} = req.body;
    // console.log(simbolo, column, layer, inputBt);
    try {
      const respuesta = await capasService.busquedaAvanzada(simbolo, column, layer, inputBt);
      res.status(200).json({ status: "success" , data: respuesta});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async archivoShape(req,res) {
    // console.log(simbolo, column, layer, inputBt);
    const { geoserver,workspace,layer,simbolo, column, inputBt} = req.body;
    try {
      let url = ''
      if (simbolo!='' && column!='' && inputBt!='') {
        url = geoserver+'?request=GetFeature&service=WFS&version=1.1.0&typeName='+workspace+':'+layer+'&outputFormat=application/json&CQL_FILTER='+ column+simbolo+inputBt
      } else {
        url = geoserver+'?request=GetFeature&service=WFS&version=1.1.0&typeName='+workspace+':'+layer+'&outputFormat=application/json'
      }
      console.log(url);
      const response = await axios.get(url);
      const geojson = response.data;
      // console.log(geojson);
      const options = {
        folder: 'myshapes',
        types: {
          point: 'mypoints',
          polygon: 'mypolygons',
          polyline: 'mylines',
        },
      };
    // Convertir GeoJSON a formato Shapefile
    var content = zip(geojson, options);
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=archivo.zip');
    res.send(Buffer.from(content, 'base64'));
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async archivoJson(req,res) {
    // console.log(simbolo, column, layer, inputBt);
    const { jsonData } = req.body;
    try {
      // Configurar cabeceras para indicar que se envía un archivo JSON
      res.setHeader('Content-Disposition', 'attachment; filename=datos.json');
      res.setHeader('Content-Type', 'application/json');

      // Convertir el objeto JSON a una cadena JSON y enviarlo en el cuerpo de la respuesta
      res.send(JSON.stringify(jsonData, null, 2));
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async validacionData(req,res) {
    // const { simbolo, column, layer, inputBt} = req.body;
    // console.log(simbolo, column, layer, inputBt);
    try {
      const respuesta = await capasService.validacionData();
      res.status(200).json({ status: "success" , data: respuesta});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async jsonFallido(req,res) {
    const { id } = req.params;
    try {
      const respuesta = await capasService.jsonFallido(id);
      res.status(200).json({ status: "success" , data: respuesta});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async descargarExcel(req, res) {
    const { table, datosCapas } = req.body;
    try {
      let exportarTemp = [];
      table.forEach((item) => {
        exportarTemp.push({
          1: item.grupo,
          2: item.titulo,
          3: item.cantidad,
        });
      });

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Reporte general");

      worksheet.columns = [
        { header: "Nombre Grupo", key: "1", width: 30 },
        { header: "Nombre Titulo", key: "2", width: 50 },
        { header: "Cantidad", key: "3", width: 50 },
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

      // Add Array Rows
      worksheet.addRows(exportarTemp);

      datosCapas.forEach((element) => {
        let worksheet = workbook.addWorksheet(
          element.grupo + " " + element.capa
        );
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
      const titulo = layer
      const data = response
      const columnas = []
      if ( response.length > 0 ) {
        for (let index in response[0]) {
          columnas.push(index)          
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
        "attachment; filename=" + titulo+".xlsx"
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
        "attachment; filename=" + titulo+".xlsx"
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
