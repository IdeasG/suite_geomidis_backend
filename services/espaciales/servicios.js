import { Op } from "sequelize";
import EessIpresSaludGeog from "../../models/espaciales/eessIpresSaludGeog.js";
import IieeEducacionGeog from "../../models/espaciales/iieeEducacionGeog.js";

export class ServiciosService {
  async buscarServicios(tipo, searchText) {
    try {
      let results;
      if (tipo == 'E') {
        // Búsqueda avanzada: todas las palabras deben estar en al menos uno de los campos
        const palabras = searchText.trim().split(/\s+/);
        results = await IieeEducacionGeog.findAll({
          where: {
            [Op.and]: palabras.map(palabra => ({
              [Op.or]: [
                { cen_ed_etq: { [Op.iLike]: `%${palabra}%` } },
                { dir_cen: { [Op.iLike]: `%${palabra}%` } },
                { codlocal: { [Op.iLike]: `%${palabra}%` } },
                { d_dpto: { [Op.iLike]: `%${palabra}%` } },
                { d_prov: { [Op.iLike]: `%${palabra}%` } },
                { d_dist: { [Op.iLike]: `%${palabra}%` } },
              ]
            }))
          },
          limit: 20,
        });
      } else if (tipo == 'S') {
        const palabras = searchText.trim().split(/\s+/);
        results = await EessIpresSaludGeog.findAll({
          where: {
            [Op.and]: palabras.map(palabra => ({
              [Op.or]: [
                { nombestabl: { [Op.iLike]: `%${palabra}%` } },
                { direccion: { [Op.iLike]: `%${palabra}%` } },
                { codunico: { [Op.iLike]: `%${palabra}%` } },
                { departamen: { [Op.iLike]: `%${palabra}%` } },
                { provincia: { [Op.iLike]: `%${palabra}%` } },
                { distrito: { [Op.iLike]: `%${palabra}%` } },
              ]
            }))
          },
          limit: 20,
        });
      }
      return {
        status: "success",
        data: results,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener lista de mapa base externa. " + error);
    }
  }
}
