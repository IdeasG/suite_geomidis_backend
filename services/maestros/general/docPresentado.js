import DocPresentado from "../../../models/maestros/general/docPresentado.js";
export class DocPresentadoService {
  async getAllDocPresentado() {
    try {
      const data = await DocPresentado.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createDocPresentado(cod_doc_presentado, nomb_doc_presentado) {
    try {
      const data = await DocPresentado.create({
        cod_doc_presentado: cod_doc_presentado,
        nomb_doc_presentado: nomb_doc_presentado,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el documento presentado.");
    }
  }

  async getDocPresentadoById(id) {
    try {
      const data = await DocPresentado.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateDocPresentado(cod_doc_presentado, updatedFields) {
    try {
      const DocPresentado = await this.getDocPresentadoById(cod_doc_presentado);
      await DocPresentado.update(updatedFields);
      return DocPresentado;
    } catch (error) {
      throw new Error("Error al actualizar la data.");
    }
  }

  async deleteDocPresentado(cod_doc_presentado) {
    try {
      const DocPresentado = await this.getDocPresentadoById(cod_doc_presentado);
      await DocPresentado.destroy();
      return DocPresentado;
    } catch (error) {
      throw new Error("Error al eliminar la data.");
    }
  }

  async patchDocPresentado(cod_doc_presentado, updatedFields) {
    try {
      const DocPresentado = await this.getDocPresentadoById(cod_doc_presentado);
      await DocPresentado.update(updatedFields);
      return DocPresentado;
    } catch (error) {
      throw new Error("Error al aplicar el parche al documento presentado.");
    }
  }
}
