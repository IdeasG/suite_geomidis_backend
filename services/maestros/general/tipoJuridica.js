import TipoJuridica from "../../../models/maestros/general/tipoJuridica.js";
export class TipoJuridicaService {
  async getAllTipoJuridica() {
    try {
      const data = await TipoJuridica.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoJuridica(cod_tipo_perjuridica, nomb_tipo_perjuridica) {
    try {
      const data = await TipoJuridica.create({
        cod_tipo_perjuridica: cod_tipo_perjuridica,
        nomb_tipo_perjuridica: nomb_tipo_perjuridica,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de persona juridica.");
    }
  }

  async getTipoJuridicaById(id) {
    try {
      const data = await TipoJuridica.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoJuridica(cod_tipo_perjuridica, updatedFields) {
    try {
      const TipoJuridica = await this.getTipoJuridicaById(cod_tipo_perjuridica);
      await TipoJuridica.update(updatedFields);
      return TipoJuridica;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de persona juridica.");
    }
  }

  async deleteTipoJuridica(cod_tipo_perjuridica) {
    try {
      cod_tipo_perjuridica;
      const TipoJuridica = await this.getTipoJuridicaById(cod_tipo_perjuridica);
      await TipoJuridica.destroy();
      return TipoJuridica;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de persona juridica.");
    }
  }

  async patchTipoJuridica(cod_tipo_perjuridica, updatedFields) {
    try {
      const TipoJuridica = await this.getTipoJuridicaById(cod_tipo_perjuridica);
      await TipoJuridica.update(updatedFields);
      return TipoJuridica;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche al tipo de persona juridica."
      );
    }
  }
}
