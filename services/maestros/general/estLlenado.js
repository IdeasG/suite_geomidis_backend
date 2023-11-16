import EstLlenado from "../../../models/maestros/general/estLlenado.js";

export class EstLlenadoService {
  async getAllEstLlenado() {
    try {
      const data = await EstLlenado.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEstLlenado(cod_est_llenado, nomb_est_llenado) {
    try {
      const data = await EstLlenado.create({
        cod_est_llenado: cod_est_llenado,
        nomb_est_llenado: nomb_est_llenado,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el estado de llenado.");
    }
  }

  async getEstLlenadoById(id) {
    try {
      const data = await EstLlenado.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener el Estado de llenado.");
    }
  }

  async updateEstLlenado(cod_est_llenado, updatedFields) {
    try {
      const EstLlenado = await this.getEstLlenadoById(cod_est_llenado);
      await EstLlenado.update(updatedFields);
      return EstLlenado;
    } catch (error) {
      throw new Error("Error al actualizar el Estado de llenado.");
    }
  }

  async deleteEstLlenado(cod_est_llenado) {
    try {
      const EstLlenado = await this.getEstLlenadoById(cod_est_llenado);
      await EstLlenado.destroy();
      return EstLlenado;
    } catch (error) {
      throw new Error("Error al eliminar el Estado de llenado.");
    }
  }

  async patchEstLlenado(cod_est_llenado, updatedFields) {
    try {
      const EstLlenado = await this.getEstLlenadoById(cod_est_llenado);
      await EstLlenado.update(updatedFields);
      return EstLlenado;
    } catch (error) {
      throw new Error("Error al aplicar el parche de Estado de llenado.");
    }
  }
}
