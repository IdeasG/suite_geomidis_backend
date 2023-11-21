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
      const dbResponse = await MapaBase.create({c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key});
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al registrar mapa base externa.");
    }
  }

  async deleteMapaBase(id_base) {
    try {
      const dbResponse = await MapaBase.destroy({where:{id_base}});
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al registrar mapa base externa.");
    }
  }

  async putMapaBase(id_base,c_nomb_mapa, c_key, c_imagery_set, c_url) {
    try {
      const dbResponse = await MapaBase.update({c_nomb_mapa, c_key, c_imagery_set, c_url},{where:{id_base}});
      return {
        status: "success",
        data: dbResponse,
      };
    } catch (error) {
      throw new Error("Error al actualizar mapa base externa.");
    }
  }
}
