import FilEstilistica from "../../../models/maestros/cultural/filEstilistica.js";

export class FilEstilisticaService {
  async getAllFilEstilistica() {
    try {
      const data = await FilEstilistica.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createFilEstilistica(cod_fil_estilistica, nomb_fil_estilistica) {
    try {
      const data = await FilEstilistica.create({
        cod_fil_estilistica: cod_fil_estilistica,
        nomb_fil_estilistica: nomb_fil_estilistica,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la filiacion estilistica.");
    }
  }

  async getFilEstilisticaById(id) {
    try {
      const data = await FilEstilistica.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateFilEstilistica(cod_fil_estilistica, updatedFields) {
    try {
      const FilEstilistica = await this.getFilEstilisticaById(
        cod_fil_estilistica
      );
      await FilEstilistica.update(updatedFields);
      return FilEstilistica;
    } catch (error) {
      throw new Error("Error al actualizar la filiacion estilistica.");
    }
  }

  async deleteFilEstilistica(cod_fil_estilistica) {
    try {
      const FilEstilistica = await this.getFilEstilisticaById(
        cod_fil_estilistica
      );
      await FilEstilistica.destroy();
      return FilEstilistica;
    } catch (error) {
      throw new Error("Error al eliminar la filiacion estilistica.");
    }
  }

  async patchFilEstilistica(cod_fil_estilistica, updatedFields) {
    try {
      const FilEstilistica = await this.getFilEstilisticaById(
        cod_fil_estilistica
      );
      await FilEstilistica.update(updatedFields);
      return FilEstilistica;
    } catch (error) {
      throw new Error("Error al aplicar el parche la filiacion estilistica.");
    }
  }
}
