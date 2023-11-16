import ElemArquitectonico from "../../../models/maestros/cultural/elemArquitectonico.js";
export class ElemArquitectonicoService {
  async getAllElemArquitectonico() {
    try {
      const data = await ElemArquitectonico.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createElemArquitectonico(cod_elem_arq, nomb_elem_arq) {
    try {
      const data = await ElemArquitectonico.create({
        cod_elem_arq: cod_elem_arq,
        nomb_elem_arq: nomb_elem_arq,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el element arquitectonico.");
    }
  }

  async getElemArquitectonicoById(id) {
    try {
      const data = await ElemArquitectonico.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateElemArquitectonico(cod_elem_arq, updatedFields) {
    try {
      const ElemArquitectonico = await this.getElemArquitectonicoById(
        cod_elem_arq
      );
      await ElemArquitectonico.update(updatedFields);
      return ElemArquitectonico;
    } catch (error) {
      throw new Error("Error al actualizar el elemento arquitectonico.");
    }
  }

  async deleteElemArquitectonico(cod_elem_arq) {
    try {
      const ElemArquitectonico = await this.getElemArquitectonicoById(
        cod_elem_arq
      );
      await ElemArquitectonico.destroy();
      return ElemArquitectonico;
    } catch (error) {
      throw new Error("Error al eliminar el elemento arquitectonico.");
    }
  }

  async patchElemArquitectonico(cod_elem_arq, updatedFields) {
    try {
      const ElemArquitectonico = await this.getElemArquitectonicoById(
        cod_elem_arq
      );
      await ElemArquitectonico.update(updatedFields);
      return ElemArquitectonico;
    } catch (error) {
      throw new Error("Error al aplicar el parche al elemento arquitectonico.");
    }
  }
}
