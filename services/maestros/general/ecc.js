import Ecc from "../../../models/maestros/general/ecc.js";
export class EccService {
  async getAllEcc() {
    try {
      const data = await Ecc.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEcc(cod_ecc, nomb_ecc) {
    try {
      const data = await Ecc.create({
        cod_ecc: cod_ecc,
        nomb_ecc: nomb_ecc,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el ECC.");
    }
  }

  async getEccById(id) {
    try {
      const data = await Ecc.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateEcc(cod_ecc, updatedFields) {
    try {
      const Ecc = await this.getEccById(cod_ecc);
      await Ecc.update(updatedFields);
      return Ecc;
    } catch (error) {
      throw new Error("Error al actualizar el ECC.");
    }
  }

  async deleteEcc(cod_ecc) {
    try {
      const Ecc = await this.getEccById(cod_ecc);
      await Ecc.destroy();
      return Ecc;
    } catch (error) {
      throw new Error("Error al eliminar el ECC.");
    }
  }

  async patchEcc(cod_ecc, updatedFields) {
    try {
      const Ecc = await this.getEccById(cod_ecc);
      await Ecc.update(updatedFields);
      return Ecc;
    } catch (error) {
      throw new Error("Error al aplicar el parche a la ECC.");
    }
  }
}
