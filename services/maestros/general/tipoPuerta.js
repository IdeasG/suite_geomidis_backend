import TipoPuerta from "../../../models/maestros/general/tipoPuerta.js";

export class TipoPuertaService {
  async createTipoPuerta(codTipoPuerta, nombTipoPuerta) {
    // Lógica para crear un tipo de puerta
  }

  async getAllTipoPuertas() {
    try {
      const data = await TipoPuerta.findAll();
      return {
        tipoPuerta: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información maestra...." + error);
    }
  }

  async getTipoPuertaById(codTipoPuerta) {
    // Lógica para obtener un tipo de puerta por ID
  }

  async updateTipoPuerta(codTipoPuerta, updatedFields) {
    // Lógica para actualizar un tipo de puerta por ID
  }

  async deleteTipoPuerta(codTipoPuerta) {
    // Lógica para eliminar un tipo de puerta por ID
  }

  async patchTipoPuerta(codTipoPuerta, updatedFields) {
    // Lógica para aplicar un parche a un tipo de puerta por ID
  }
}
