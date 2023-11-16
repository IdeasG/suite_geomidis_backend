import ClasifPredio from "../../../models/maestros/general/clasifPredio.js";

export class ClasifPredioService {
  async getAllClasifPredio() {
    try {
      const data = await ClasifPredio.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createClasifPredio(cod_clasif_predio, nomb_clasif_predio) {
    try {
      const data = await ClasifPredio.create({
        cod_clasif_predio: cod_clasif_predio,
        nomb_clasif_predio: nomb_clasif_predio,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la clasificacion del predio.");
    }
  }

  async getClasifPredioById(id) {
    try {
      const data = await ClasifPredio.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateClasifPredio(cod_clasif_predio, updatedFields) {
    try {
      const ClasifPredio = await this.getClasifPredioById(cod_clasif_predio);
      await ClasifPredio.update(updatedFields);
      return ClasifPredio;
    } catch (error) {
      throw new Error("Error al actualizar la clasificacion del predio.");
    }
  }

  async deleteClasifPredio(cod_clasif_predio) {
    try {
      const ClasifPredio = await this.getClasifPredioById(cod_clasif_predio);
      await ClasifPredio.destroy();
      return ClasifPredio;
    } catch (error) {
      throw new Error("Error al eliminar la clasificacion del predio.");
    }
  }

  async patchClasifPredio(cod_clasif_predio, updatedFields) {
    try {
      const ClasifPredio = await this.getClasifPredioById(cod_clasif_predio);
      await ClasifPredio.update(updatedFields);
      return ClasifPredio;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la clasificacion del predio."
      );
    }
  }
}
