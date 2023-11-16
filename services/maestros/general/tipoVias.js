import TipoVia from "../../../models/maestros/general/tipoVias.js";

export class TipoViaService {
  async createTipoVia(codTipoVia, nombTipoVia) {
    try {
      const tipoVia = await TipoVia.create({
        cod_tipo_via: codTipoVia,
        nomb_tipo_via: nombTipoVia,
      });
      return tipoVia;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async getAllTipoVias(pageNumber, pageSize) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const tipoVias = await TipoVia.findAndCountAll({
        offset,
        limit: pageSize,
      });
      const totalItems = tipoVias.count;
      const totalPages = Math.ceil(totalItems / pageSize);
      return {
        items: tipoVias.rows,
        currentPage: parseInt(pageNumber),
        totalPages,
        totalItems,
      };
    } catch (error) {
      throw new Error("Error al obtener los tipos de vía...." + error);
    }
  }

  async getTipoViaById(codTipoVia) {
    try {
      const tipoVia = await TipoVia.findByPk(codTipoVia);
      if (!tipoVia) {
        throw new Error("Tipo de vía no encontrado.");
      }
      return tipoVia;
    } catch (error) {
      throw new Error("Error al obtener el tipo de vía por ID.");
    }
  }

  async updateTipoVia(codTipoVia, updatedFields) {
    try {
      const tipoVia = await this.getTipoViaById(codTipoVia);
      await tipoVia.update(updatedFields);
      return tipoVia;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de vía.");
    }
  }

  async deleteTipoVia(codTipoVia) {
    try {
      const tipoVia = await this.getTipoViaById(codTipoVia);
      await tipoVia.destroy();
      return tipoVia;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de vía.");
    }
  }

  async patchTipoVia(codTipoVia, updatedFields) {
    try {
      const tipoVia = await this.getTipoViaById(codTipoVia);
      await tipoVia.update(updatedFields);
      return tipoVia;
    } catch (error) {
      throw new Error("Error al aplicar el parche al tipo de vía.");
    }
  }
}
