import SpSector from "../../models/espaciales/spSector.js";
import SpManzana from "../../models/espaciales/spManzana.js";
import SpLote from "../../models/espaciales/spLote.js";
import SpDistrito from "../../models/espaciales/spDistrito.js";

export class SmlService {
  async getDistrito() {
    try {
      const data = await SpDistrito.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener el sector.");
    }
  }
  async getSector() {
    try {
      const sector = await SpSector.findAll({
        attributes: ["id_sector", "c_cod_sector"],
        order: [["c_cod_sector", "ASC"]],
      });
      return {
        data: {
          sector
        },
      };
    } catch (error) {
      throw new Error("Error al obtener el sector.");
    }
  }
  async getManzana(id_sector) {
    try {
      const data = await SpManzana.findAll({
        where: {
          id_sector: id_sector,
        },
        attributes: ["id_manzana", "c_cod_mzna"],
        order: [["c_cod_mzna", "ASC"]],
      });
      return data;
    } catch (error) {
      throw new Error("Error al obtener la manzana.");
    }
  }

  async getLote(id_manzana) {
    try {
      const data = await SpLote.findAll({
        where: {
          id_manzana: id_manzana,
        },
        attributes: ["id_lote", "c_cod_lote"],
        order: [["c_cod_lote", "ASC"]],
      });
      return data;
    } catch (error) {
      throw new Error("Error al obtener el lote.");
    }
  }
}
