import AfecAntropicas from "../../../models/maestros/cultural/afecAntropicas.js";
export class AfecAntropicasService {
  async getAllAfecAntropicas() {
    try {
      const data = await AfecAntropicas.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createAfecAntropicas(cod_afec_antrop, nomb_afec_antrop) {
    try {
      const data = await AfecAntropicas.create({
        cod_afec_antrop: cod_afec_antrop,
        nomb_afec_antrop: nomb_afec_antrop,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la afectacion antropica.");
    }
  }

  async getAfecAntropicasById(codAfecAntropicas) {
    try {
      const data = await AfecAntropicas.findByPk(codAfecAntropicas);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateAfecAntropicas(cod_afec_antrop, updatedFields) {
    try {
      const AfecAntropicas = await this.getAfecAntropicasById(cod_afec_antrop);
      await AfecAntropicas.update(updatedFields);
      return AfecAntropicas;
    } catch (error) {
      throw new Error("Error al actualizar la afectacion antropica.");
    }
  }

  async deleteAfecAntropicas(cod_afec_antrop) {
    try {
      const AfecAntropicas = await this.getAfecAntropicasById(cod_afec_antrop);
      await AfecAntropicas.destroy();
      return AfecAntropicas;
    } catch (error) {
      throw new Error("Error al eliminar la afectacion antropica.");
    }
  }

  async patchAfecAntropicas(cod_afec_antrop, updatedFields) {
    try {
      const AfecAntropicas = await this.cod_afec_antrop(cod_afec_antrop);
      await AfecAntropicas.update(updatedFields);
      return AfecAntropicas;
    } catch (error) {
      throw new Error("Error al aplicar el parche la afectacion antropica.");
    }
  }
}
