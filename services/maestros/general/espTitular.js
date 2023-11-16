import EspTitular from "../../../models/maestros/general/espTitular.js";
export class EspTitularService {
  async getAllEspTitular() {
    try {
      const data = await EspTitular.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEspTitular(cod_cond_esp_tit, nomb_cond_esp_tit) {
    try {
      const data = await EspTitular.create({
        cod_cond_esp_tit: cod_cond_esp_tit,
        nomb_cond_esp_tit: nomb_cond_esp_tit,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la condicion especial del titular.");
    }
  }

  async getEspTitularById(id) {
    try {
      const data = await EspTitular.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateEspTitular(cod_cond_esp_tit, updatedFields) {
    try {
      const EspTitular = await this.getEspTitularById(cod_cond_esp_tit);
      await EspTitular.update(updatedFields);
      return EspTitular;
    } catch (error) {
      throw new Error("Error al actualizar la condicion especial de titular.");
    }
  }

  async deleteEspTitular(cod_cond_esp_tit) {
    try {
      const EspTitular = await this.getEspTitularById(cod_cond_esp_tit);
      await EspTitular.destroy();
      return EspTitular;
    } catch (error) {
      throw new Error("Error al eliminar la condicion especial de titular.");
    }
  }

  async patchEspTitular(cod_cond_esp_tit, updatedFields) {
    try {
      const EspTitular = await this.getEspTitularById(cod_cond_esp_tit);
      await EspTitular.update(updatedFields);
      return EspTitular;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la condicion especial de titular."
      );
    }
  }
}
