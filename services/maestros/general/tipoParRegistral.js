import TipoParRegistral from "../../../models/maestros/general/tipoParRegistral.js";
export class TipoParRegistralService {
  async getAllTipoParRegistral() {
    try {
      const data = await TipoParRegistral.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoParRegistral(cod_tipo_parregistral, nomb_tipo_parregistral) {
    try {
      const data = await TipoParRegistral.create({
        cod_tipo_parregistral: cod_tipo_parregistral,
        nomb_tipo_parregistral: nomb_tipo_parregistral,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async getTipoParRegistralById(id) {
    try {
      const data = await TipoParRegistral.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoParRegistral(cod_tipo_parregistral, updatedFields) {
    try {
      const TipoParRegistral = await this.getTipoParRegistralById(
        cod_tipo_parregistral
      );
      await TipoParRegistral.update(updatedFields);
      return TipoParRegistral;
    } catch (error) {
      throw new Error("Error al actualizar la partida registral.");
    }
  }

  async deleteTipoParRegistral(cod_tipo_parregistral) {
    try {
      const TipoParRegistral = await this.getTipoParRegistralById(
        cod_tipo_parregistral
      );
      await TipoParRegistral.destroy();
      return TipoParRegistral;
    } catch (error) {
      throw new Error("Error al eliminar la partida registral.");
    }
  }

  async patchTipoParRegistral(cod_tipo_parregistral, updatedFields) {
    try {
      const TipoParRegistral = await this.getTipoParRegistralById(
        cod_tipo_parregistral
      );
      await TipoParRegistral.update(updatedFields);
      return TipoParRegistral;
    } catch (error) {
      throw new Error("Error al aplicar el parche a la partida registral.");
    }
  }
}
