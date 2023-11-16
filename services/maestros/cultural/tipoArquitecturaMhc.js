import TipoArquitecturaMhc from "../../../models/maestros/cultural/tipoArquitecturaMhc.js";
export class TipoArquitecturaMhcService {
  async getAllTipoArquitecturaMhc() {
    try {
      const data = await TipoArquitecturaMhc.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoArquitecturaMhc(cod_tipo_arq_mhc, nomb_tipo_arq_mhc) {
    try {
      const data = await TipoArquitecturaMhc.create({
        cod_tipo_arq_mhc: cod_tipo_arq_mhc,
        nomb_tipo_arq_mhc: nomb_tipo_arq_mhc,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de arquitectura.");
    }
  }

  async getTipoArquitecturaMhcById(id) {
    try {
      const data = await TipoArquitecturaMhc.findByPk(id);
      if (!data) {
        throw new Error("Data encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoArquitecturaMhc(cod_tipo_arq_mhc, updatedFields) {
    try {
      const TipoArquitecturaMhc = await this.getTipoArquitecturaMhcById(
        cod_tipo_arq_mhc
      );
      await TipoArquitecturaMhc.update(updatedFields);
      return TipoArquitecturaMhc;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de arquitectura.");
    }
  }

  async deleteTipoArquitecturaMhc(cod_tipo_arq_mhc) {
    try {
      const TipoArquitecturaMhc = await this.getTipoArquitecturaMhcById(
        cod_tipo_arq_mhc
      );
      await TipoArquitecturaMhc.destroy();
      return TipoArquitecturaMhc;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de arquitectura.");
    }
  }

  async patchTipoArquitecturaMhc(cod_tipo_arq_mhc, updatedFields) {
    try {
      const TipoArquitecturaMhc = await this.getTipoArquitecturaMhcById(
        cod_tipo_arq_mhc
      );
      await TipoArquitecturaMhc.update(updatedFields);
      return TipoArquitecturaMhc;
    } catch (error) {
      throw new Error("Error al aplicar el parche al tipo de arquitectura.");
    }
  }
}
