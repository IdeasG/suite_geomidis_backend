import { Op } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
import Eess from "../../models/espaciales/eess.js";
import Iiee from "../../models/espaciales/iiee.js";

export class ServiciosService {
  async buscarServicios(tipo, searchText) {
    try {
      console.log(searchText);

      let results;
      if (tipo == 'E') {
        // Búsqueda en espaciales.iiee por `vcodmodula` usando ILIKE y limitando a 10 resultados
        results = await Iiee.findAll({
          where: {
            vcodmodula: {
              [Op.iLike]: `%${searchText}%`,
            },
          },
          limit: 10,
        });
      } else if (tipo == 'S') {
        // Búsqueda en espaciales.eess por `código_ú` usando ILIKE y limitando a 10 resultados
        results = await Eess.findAll({
          where: {
            "código_ú": {
              [Op.iLike]: `%${searchText}%`,
            },
          },
          limit: 10,
        });
      }

      return {
        status: "success",
        data: results,
      };
    } catch (error) {
      throw new Error("Error al obtener lista de mapa base externa. " + error);
    }
  }
}
