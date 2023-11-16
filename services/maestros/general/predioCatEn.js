import PredioCatEn from "../../../models/maestros/general/predioCatEn.js";

export class PredioCatEnService {
  async getAllPredioCatEn() {
    try {
      const data = await PredioCatEn.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createPredioCatEn(cod_predio_cat_en, nomb_predio_cat_en) {
    try {
      const data = await PredioCatEn.create({
        cod_predio_cat_en: cod_predio_cat_en,
        nomb_predio_cat_en: nomb_predio_cat_en,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el predio catastral en.");
    }
  }

  async getPredioCatEnById(id) {
    try {
      const data = await PredioCatEn.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updatePredioCatEn(cod_predio_cat_en, updatedFields) {
    try {
      const PredioCatEn = await this.getPredioCatEnById(cod_predio_cat_en);
      await PredioCatEn.update(updatedFields);
      return PredioCatEn;
    } catch (error) {
      throw new Error("Error al actualizar el predio catastral en.");
    }
  }

  async deletePredioCatEn(cod_predio_cat_en) {
    try {
      const PredioCatEn = await this.getPredioCatEnById(cod_predio_cat_en);
      await PredioCatEn.destroy();
      return PredioCatEn;
    } catch (error) {
      throw new Error("Error al eliminar el predio catastral en.");
    }
  }

  async patchPredioCatEn(cod_predio_cat_en, updatedFields) {
    try {
      const PredioCatEn = await this.getPredioCatEnById(cod_predio_cat_en);
      await PredioCatEn.update(updatedFields);
      return PredioCatEn;
    } catch (error) {
      throw new Error("Error al aplicar el parche al predio catastral en.");
    }
  }
}
