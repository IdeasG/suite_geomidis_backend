import InterConservacion from "../../../models/maestros/cultural/interConservacion.js";
export class InterConservacionService {
  async getAllInterConservacion() {
    try {
      const data = await InterConservacion.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createInterConservacion(cod_interv_conserv, nomb_inter_conserv) {
    try {
      const data = await InterConservacion.create({
        cod_interv_conserv: cod_interv_conserv,
        nomb_inter_conserv: nomb_inter_conserv,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la intervencion de conservacion.");
    }
  }

  async getInterConservacionById(id) {
    try {
      const data = await InterConservacion.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateInterConservacion(cod_interv_conserv, updatedFields) {
    try {
      const InterConservacion = await this.getInterConservacionById(
        cod_interv_conserv
      );
      await InterConservacion.update(updatedFields);
      return InterConservacion;
    } catch (error) {
      throw new Error("Error al actualizar la intervencion de conservacion.");
    }
  }

  async deleteInterConservacion(cod_interv_conserv) {
    try {
      const InterConservacion = await this.getInterConservacionById(
        cod_interv_conserv
      );
      await InterConservacion.destroy();
      return InterConservacion;
    } catch (error) {
      throw new Error("Error al eliminar la intervencion de conservacion.");
    }
  }

  async patchInterConservacion(cod_interv_conserv, updatedFields) {
    try {
      const InterConservacion = await this.getInterConservacionById(
        cod_interv_conserv
      );
      await InterConservacion.update(updatedFields);
      return InterConservacion;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche la intervencion de conservacion."
      );
    }
  }
}
