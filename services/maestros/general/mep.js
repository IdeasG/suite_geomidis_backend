import Mep from "../../../models/maestros/general/mep.js";
export class MepService {
  async getAllMep() {
    try {
      const data = await Mep.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createMep(cod_mep, nomb_mep) {
    try {
      const data = await Mep.create({
        cod_mep: cod_mep,
        nomb_mep: nomb_mep,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el MEP.");
    }
  }

  async getMepById(id) {
    try {
      const data = await Mep.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateMep(cod_mep, updatedFields) {
    try {
      const Mep = await this.getMepById(cod_mep);
      await Mep.update(updatedFields);
      return Mep;
    } catch (error) {
      throw new Error("Error al actualizar el MEP.");
    }
  }

  async deleteMep(cod_mep) {
    try {
      const Mep = await this.getMepById(cod_mep);
      await Mep.destroy();
      return Mep;
    } catch (error) {
      throw new Error("Error al eliminar el MEP.");
    }
  }

  async patchMep(cod_mep, updatedFields) {
    try {
      const Mep = await this.getMepById(cod_mep);
      await Mep.update(updatedFields);
      return Mep;
    } catch (error) {
      throw new Error("Error al aplicar el parche el MEP.");
    }
  }
}
