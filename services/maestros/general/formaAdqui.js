import FormaAdqui from "../../../models/maestros/general/formaAdqui.js";
export class FormaAdquiService {
  async getAllFormaAdqui() {
    try {
      const data = await FormaAdqui.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createFormaAdqui(cod_forma_adqui, nomb_forma_adqui) {
    try {
      const data = await FormaAdqui.create({
        cod_forma_adqui: cod_forma_adqui,
        nomb_forma_adqui: nomb_forma_adqui,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la forma de adquisicion.");
    }
  }

  async getFormaAdquiById(id) {
    try {
      const data = await FormaAdqui.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateFormaAdqui(cod_forma_adqui, updatedFields) {
    try {
      const FormaAdqui = await this.getFormaAdquiById(cod_forma_adqui);
      await FormaAdqui.update(updatedFields);
      return FormaAdqui;
    } catch (error) {
      throw new Error("Error al actualizar la forma de adquisicion.");
    }
  }

  async deleteFormaAdqui(cod_forma_adqui) {
    try {
      const FormaAdqui = await this.getFormaAdquiById(cod_forma_adqui);
      await FormaAdqui.destroy();
      return FormaAdqui;
    } catch (error) {
      throw new Error("Error al eliminar la forma de adquisicion.");
    }
  }

  async patchFormaAdqui(cod_forma_adqui, updatedFields) {
    try {
      const FormaAdqui = await this.getFormaAdquiById(cod_forma_adqui);
      await FormaAdqui.update(updatedFields);
      return FormaAdqui;
    } catch (error) {
      throw new Error("Error al aplicar el parche a la forma de adquisicion.");
    }
  }
}
