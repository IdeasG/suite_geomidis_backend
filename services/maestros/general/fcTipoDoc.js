import FcTipoDoc from "../../../models/maestros/general/fcTipoDoc.js";
export class FcTipoDocService {
  async getAllFcTipoDoc() {
    try {
      const data = await FcTipoDoc.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createFcTipoDoc(cod_fc_tipo_doc, nomb_fc_tipo_doc) {
    try {
      const data = await FcTipoDoc.create({
        cod_fc_tipo_doc: cod_fc_tipo_doc,
        nomb_fc_tipo_doc: nomb_fc_tipo_doc,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo documento.");
    }
  }

  async getFcTipoDocById(id) {
    try {
      const data = await FcTipoDoc.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateFcTipoDoc(cod_fc_tipo_doc, updatedFields) {
    try {
      const FcTipoDoc = await this.getFcTipoDocById(cod_fc_tipo_doc);
      await FcTipoDoc.update(updatedFields);
      return FcTipoDoc;
    } catch (error) {
      throw new Error("Error al actualizar el tipo de documento.");
    }
  }

  async deleteFcTipoDoc(cod_fc_tipo_doc) {
    try {
      const FcTipoDoc = await this.getFcTipoDocById(cod_fc_tipo_doc);
      await FcTipoDoc.destroy();
      return FcTipoDoc;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de documento.");
    }
  }

  async patchFcTipoDoc(cod_fc_tipo_doc, updatedFields) {
    try {
      const tipoFcTipoDocVia = await this.getFcTipoDocById(cod_fc_tipo_doc);
      await FcTipoDoc.update(updatedFields);
      return FcTipoDoc;
    } catch (error) {
      throw new Error("Error al aplicar el parche al tipo de documento.");
    }
  }
}
