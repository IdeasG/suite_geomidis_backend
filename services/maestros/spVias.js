import SpVias from "../../models/espaciales/spVias.js";

export class SpViasService {
  async createSpVias(codTipoPuerta, nombTipoPuerta) {
    // Lógica para crear un tipo de puerta
  }

  async getAllSpVias() {
    try {
      const data = await SpVias.findAll({
        attributes: [
          "id_via",
          "c_cod_via",
          "c_nomb_via",
          "cod_tipo_via",
          "etiqueta",
        ],
        where: {
          estado: true,
        },
      });
      return {
        spVias: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información maestra...." + error);
    }
  }

  async getSpViasById(codTipoPuerta) {
    // Lógica para obtener un tipo de puerta por ID
  }

  async updateSpVias(codTipoPuerta, updatedFields) {
    // Lógica para actualizar un tipo de puerta por ID
  }

  async deleteSpVias(codTipoPuerta) {
    // Lógica para eliminar un tipo de puerta por ID
  }

  async patchSpVias(codTipoPuerta, updatedFields) {
    // Lógica para aplicar un parche a un tipo de puerta por ID
  }
}
