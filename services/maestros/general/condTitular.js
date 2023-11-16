import CondTitular from "../../../models/maestros/general/condTitular.js";
export class CondTitularService {
  async getAllCondTitular() {
    try {
      const data = await CondTitular.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createCondTitular(cod_cond, nomb_cond) {
    try {
      const data = await CondTitular.create({
        cod_cond: cod_cond,
        nomb_cond: nomb_cond,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la condicion del titular.");
    }
  }

  async getCondTitularById(id) {
    try {
      const data = await CondTitular.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateCondTitular(cod_cond, updatedFields) {
    try {
      const CondTitular = await this.getCondTitularById(cod_cond);
      await CondTitular.update(updatedFields);
      return CondTitular;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de vía.");
    }
  }

  async deleteCondTitular(id) {
    try {
      const CondTitular = await this.getCondTitularById(id);
      await CondTitular.destroy();
      return CondTitular;
    } catch (error) {
      throw new Error("Error al eliminar la data.");
    }
  }

  async patchCondTitular(cod_cond, updatedFields) {
    try {
      const CondTitular = await this.getCondTitularById(cod_cond);
      await CondTitular.update(updatedFields);
      return CondTitular;
    } catch (error) {
      throw new Error("Error al aplicar el parche a la condicion del titular.");
    }
  }
}
