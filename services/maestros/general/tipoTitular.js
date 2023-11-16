import TipoTitular from "../../../models/maestros/general/tipoTitular.js";
export class TipoTitularService {
  async getAllTipoTitular() {
    try {
      const data = await TipoTitular.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoTitular(cod_tipo_titular, nomb_tipo_titular) {
    try {
      const data = await TipoTitular.create({
        cod_tipo_titular: cod_tipo_titular,
        nomb_tipo_titular: nomb_tipo_titular,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la nueva data.");
    }
  }

  async getTipoTitularById(id) {
    try {
      const data = await TipoTitular.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoTitular(id, updatedFields) {
    try {
      const TipoTitular = await this.getTipoTitularById(id);
      await TipoTitular.update(updatedFields);
      return TipoTitular;
    } catch (error) {
      throw new Error("Error al actualizar la data.");
    }
  }

  async deleteTipoTitular(id) {
    try {
      const TipoTitular = await this.getTipoTitularById(id);
      await TipoTitular.destroy();

      return TipoTitular;
    } catch (error) {
      throw new Error("Error al eliminar la data.");
    }
  }

  async patchTipoTitular(cod_tipo_titular, updatedFields) {
    try {
      const data = await this.getTipoTitularById(cod_tipo_titular);
      await TipoTitular.update(updatedFields);
      return data;
    } catch (error) {
      throw new Error("Error al aplicar el parche.");
    }
  }
}
