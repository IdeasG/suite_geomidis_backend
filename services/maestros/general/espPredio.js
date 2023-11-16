import EspPredio from "../../../models/maestros/general/espPredio.js";
export class EspPredioService {
  async getAllEspPredio() {
    try {
      const data = await EspPredio.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEspPredio(cod_cond_esp_predio, nomb_cond_esp_predio) {
    try {
      const data = await EspPredio.create({
        cod_cond_esp_predio: cod_cond_esp_predio,
        nomb_cond_esp_predio: nomb_cond_esp_predio,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la condicion especial del predio.");
    }
  }

  async getEspPredioById(id) {
    try {
      const data = await EspPredio.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener el tipo de vía por ID.");
    }
  }

  async updateEspPredio(cod_cond_esp_predio, updatedFields) {
    try {
      const EspPredio = await this.getEspPredioById(cod_cond_esp_predio);
      await EspPredio.update(updatedFields);
      return EspPredio;
    } catch (error) {
      throw new Error("Error al actualizar la condicion especial del predio.");
    }
  }

  async deleteEspPredio(cod_cond_esp_predio) {
    try {
      const EspPredio = await this.getEspPredioById(cod_cond_esp_predio);
      await EspPredio.destroy();
      return EspPredio;
    } catch (error) {
      throw new Error("Error al eliminar la condicion especial del predio.");
    }
  }

  async patchEspPredio(cod_cond_esp_predio, updatedFields) {
    try {
      const EspPredio = await this.getEspPredioById(cod_cond_esp_predio);
      await EspPredio.update(updatedFields);
      return EspPredio;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la condicion especial del predio."
      );
    }
  }
}
