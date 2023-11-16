import InterInmueble from "../../../models/maestros/cultural/interInmueble.js";

export class InterInmuebleService {
  async getAllInterInmueble() {
    try {
      const data = await InterInmueble.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createInterInmueble(cod_inter_inmueble, nomb_inter_inmueble) {
    try {
      const data = await InterInmueble.create({
        cod_inter_inmueble: cod_inter_inmueble,
        nomb_inter_inmueble: nomb_inter_inmueble,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la intervencion del inmueble.");
    }
  }

  async getInterInmuebleById(id) {
    try {
      const data = await InterInmueble.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateInterInmueble(cod_inter_inmueble, updatedFields) {
    try {
      const InterInmueble = await this.getInterInmuebleById(cod_inter_inmueble);
      await InterInmueble.update(updatedFields);
      return InterInmueble;
    } catch (error) {
      throw new Error("Error al actualizar la intervencion del inmueble.");
    }
  }

  async deleteInterInmueble(cod_inter_inmueble) {
    try {
      const InterInmueble = await this.getInterInmuebleById(cod_inter_inmueble);
      await InterInmueble.destroy();
      return InterInmueble;
    } catch (error) {
      throw new Error("Error al eliminar la intervencion del inmueble.");
    }
  }

  async patchInterInmueble(cod_inter_inmueble, updatedFields) {
    try {
      const InterInmueble = await this.getInterInmuebleById(cod_inter_inmueble);
      await InterInmueble.update(updatedFields);
      return InterInmueble;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche la intervencion del inmueble."
      );
    }
  }
}
