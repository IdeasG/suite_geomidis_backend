import AfecNaturales from "../../../models/maestros/cultural/afecNaturales.js";

export class AfecNaturalesService {
  async getAllAfecNaturales() {
    try {
      const data = await AfecNaturales.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createAfecNaturales(cod_afec_natural, nomb_afec_natural) {
    try {
      const data = await AfecNaturales.create({
        cod_afec_natural: cod_afec_natural,
        nomb_afec_natural: nomb_afec_natural,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la afectacion natural.");
    }
  }

  async getAfecNaturalesById(codAfecNaturales) {
    try {
      const data = await AfecNaturales.findByPk(codAfecNaturales);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateAfecNaturales(cod_afec_natural, updatedFields) {
    try {
      const AfecNaturales = await this.getAfecNaturalesById(cod_afec_natural);
      await AfecNaturales.update(updatedFields);
      return AfecNaturales;
    } catch (error) {
      throw new Error("Error al actualizar la afectacion natural.");
    }
  }

  async deleteAfecNaturales(cod_afec_natural) {
    try {
      const AfecNaturales = await this.getAfecNaturalesById(cod_afec_natural);
      await AfecNaturales.destroy();
      return AfecNaturales;
    } catch (error) {
      throw new Error("Error al eliminar la afectacion natural.");
    }
  }

  async patchAfecNaturales(cod_afec_natural, updatedFields) {
    try {
      const AfecNaturales = await this.getAfecNaturalesById(cod_afec_natural);
      await AfecNaturales.update(updatedFields);
      return AfecNaturales;
    } catch (error) {
      throw new Error("Error al aplicar el parche la afectacion natural.");
    }
  }
}
