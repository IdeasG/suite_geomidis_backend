import MapaBase from "../../models/manager/mapaBase.js";
import { sequelize } from "../../config/postgres/sequelize.js";

export class MapaBaseService {
  async getMapaBase() {
    try {
      // const distrito = await SpDistrito.findAll();
      const dbResponse = await MapaBase.findAll();
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al obtener lista de mapa base externa.");
    }
  }

  async postMapaBase(c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key) {
    try {
      // const distrito = await SpDistrito.findAll();
      console.log(c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key);
      const dbResponse = await MapaBase.create({c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key});
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al registrar mapa base externa.");
    }
  }
}
