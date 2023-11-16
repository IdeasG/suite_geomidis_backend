import TipoArquitecturaMap from "../../../models/maestros/cultural/tipoArquitecturaMap.js";
export class TipoArquitecturaMapService {
  async getAllTipoArquitecturaMap() {
    try {
      const data = await TipoArquitecturaMap.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoArquitecturaMap(cod_tipo_arq_map, nomb_tipo_arq_map) {
    try {
      const data = await TipoArquitecturaMap.create({
        cod_tipo_arq_map: cod_tipo_arq_map,
        nomb_tipo_arq_map: nomb_tipo_arq_map,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async getTipoArquitecturaMapById(id) {
    try {
      const data = await TipoArquitecturaMap.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoArquitecturaMap(cod_tipo_arq_map, updatedFields) {
    try {
      const TipoArquitecturaMap = await this.getTipoArquitecturaMapById(
        cod_tipo_arq_map
      );
      await TipoArquitecturaMap.update(updatedFields);
      return TipoArquitecturaMap;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de arquitectura.");
    }
  }

  async deleteTipoArquitecturaMap(cod_tipo_arq_map) {
    try {
      const TipoArquitecturaMap = await this.getTipoArquitecturaMapById(
        cod_tipo_arq_map
      );
      await TipoArquitecturaMap.destroy();
      return TipoArquitecturaMap;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de arquitectura.");
    }
  }

  async patchTipoArquitecturaMap(cod_tipo_arq_map, updatedFields) {
    try {
      const TipoArquitecturaMap = await this.getTipoArquitecturaMapById(
        cod_tipo_arq_map
      );
      await TipoArquitecturaMap.update(updatedFields);
      return TipoArquitecturaMap;
    } catch (error) {
      throw new Error("Error al aplicar el parche al tipo de arquitectura.");
    }
  }
}
