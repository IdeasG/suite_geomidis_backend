import TipoInterior from "../../../models/maestros/general/tipoInterior.js";

export class TipoInteriorService {
  async createTipoInterior(codTipoInterior, nombTipoInterior) {
    // Lógica para crear un tipo interior
  }

  async getAllTipoInteriores() {
    try {
      const data = await TipoInterior.findAll();
      return {
        tipoInterior: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información maestra...." + error);
    }
  }

  async getTipoInteriorById(codTipoInterior) {
    // Lógica para obtener un tipo interior por ID
  }

  async updateTipoInterior(codTipoInterior, updatedFields) {
    // Lógica para actualizar un tipo interior por ID
  }

  async deleteTipoInterior(codTipoInterior) {
    // Lógica para eliminar un tipo interior por ID
  }

  async patchTipoInterior(codTipoInterior, updatedFields) {
    // Lógica para aplicar un parche a un tipo interior por ID
  }
}
