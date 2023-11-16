import Uca from "../../../models/maestros/general/uca.js";

export class UcaService {
  async getAllUca() {
    try {
      const data = await Uca.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createUca(cod_uca, nomb_uca) {
    try {
      const data = await Uca.create({
        cod_uca: cod_uca,
        nomb_uca: nomb_uca,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el UCA.");
    }
  }

  async getUcaById(id) {
    try {
      const data = await Uca.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateUca(cod_uca, updatedFields) {
    try {
      const Uca = await this.getUcaById(cod_uca);
      await Uca.update(updatedFields);
      return Uca;
    } catch (error) {
      throw new Error("Error al actualizar el UCA.");
    }
  }

  async deleteUca(cod_uca) {
    try {
      const Uca = await this.getUcaById(cod_uca);
      await Uca.destroy();
      return Uca;
    } catch (error) {
      throw new Error("Error al eliminar el UCA.");
    }
  }

  async patchUca(cod_uca, updatedFields) {
    try {
      const Uca = await this.getUcaById(cod_uca);
      await Uca.update(updatedFields);
      return Uca;
    } catch (error) {
      throw new Error("Error al aplicar el parche a la UCA.");
    }
  }
}
