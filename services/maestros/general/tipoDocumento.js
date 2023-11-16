import TipoDocumento from "../../../models/maestros/general/tipoDocumento.js";
export class TipoDocumentoService {
  async getAllTipoDocumento() {
    try {
      const data = await TipoDocumento.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoDocumento(cod_tipo_doc, nomb_tipo_doc) {
    try {
      const data = await TipoDocumento.create({
        cod_tipo_doc: cod_tipo_doc,
        nomb_tipo_doc: nomb_tipo_doc,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de documento.");
    }
  }

  async getTipoDocumentoById(id) {
    try {
      const data = await TipoDocumento.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la Data.");
    }
  }

  async updateTipoDocumento(cod_tipo_doc, updatedFields) {
    try {
      const TipoDocumento = await this.getTipoDocumentoById(cod_tipo_doc);
      await TipoDocumento.update(updatedFields);
      return TipoDocumento;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de documento.");
    }
  }

  async deleteTipoDocumento(id) {
    try {
      const TipoDocumento = await this.getTipoDocumentoById(id);
      await TipoDocumento.destroy();
      return TipoDocumento;
    } catch (error) {
      throw new Error("Error al eliminar la Data");
    }
  }

  async patchTipoVia(cod_tipo_doc, updatedFields) {
    try {
      const TipoDocumento = await this.getTipoDocumentoById(cod_tipo_doc);
      await TipoDocumento.update(updatedFields);
      return TipoDocumento;
    } catch (error) {
      throw new Error("Error al aplicar el parche al tipo de documento.");
    }
  }
}
