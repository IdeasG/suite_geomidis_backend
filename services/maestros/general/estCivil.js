import EstCivil from "../../../models/maestros/general/estCivil.js";
export class EstCivilService {
  async getAllEstCivil() {
    try {
      const data = await EstCivil.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEstCivil(cod_est_civil, nomb_est_civil) {
    try {
      const data = await EstCivil.create({
        cod_est_civil: cod_est_civil,
        nomb_est_civil: nomb_est_civil,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el estado civil.");
    }
  }

  async getEstCivilById(id) {
    try {
      const data = await EstCivil.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateEstCivil(cod_est_civil, updatedFields) {
    try {
      const EstCivil = await this.getEstCivilById(cod_est_civil);
      await EstCivil.update(updatedFields);
      return EstCivil;
    } catch (error) {
      throw new Error("Error al actualizar el estado civil.");
    }
  }

  async deleteEstCivil(cod_est_civil) {
    try {
      const EstCivil = await this.getEstCivilById(cod_est_civil);
      await EstCivil.destroy();
      return EstCivil;
    } catch (error) {
      throw new Error("Error al eliminar el estado civil.");
    }
  }

  async patchEstCivil(cod_est_civil, updatedFields) {
    try {
      const EstCivil = await this.getEstCivilById(cod_est_civil);
      await EstCivil.update(updatedFields);
      return EstCivil;
    } catch (error) {
      throw new Error("Error al aplicar el parche al estado civil.");
    }
  }
}
