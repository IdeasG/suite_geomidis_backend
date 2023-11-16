import CondDeclarante from "../../../models/maestros/general/condDeclarante.js";

export class CondDeclaranteService {
  async getAllCondDeclarante() {
    try {
      const data = await CondDeclarante.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createCondDeclarante(cod_cond_decla, nomb_cond_decla) {
    try {
      const data = await CondDeclarante.create({
        cod_cond_decla: cod_cond_decla,
        nomb_cond_decla: nomb_cond_decla,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la condicion de declarante.");
    }
  }

  async getCondDeclaranteById(id) {
    try {
      const data = await CondDeclarante.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateCondDeclarante(cod_cond_decla, updatedFields) {
    try {
      const CondDeclarante = await this.getCondDeclaranteById(cod_cond_decla);
      await CondDeclarante.update(updatedFields);
      return CondDeclarante;
    } catch (error) {
      throw new Error("Error al actualizar la data.");
    }
  }

  async deleteCondDeclarante(id) {
    try {
      const CondDeclarante = await this.getCondDeclaranteById(id);
      await CondDeclarante.destroy();
      return CondDeclarante;
    } catch (error) {
      throw new Error("Error al eliminar la data.");
    }
  }

  async patchCondDeclarante(cod_cond_decla, updatedFields) {
    try {
      const CondDeclarante = await this.getCondDeclaranteById(cod_cond_decla);
      await CondDeclarante.update(updatedFields);
      return CondDeclarante;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la condicion del declarante."
      );
    }
  }
}
