import DeclaFabrica from "../../../models/maestros/general/declaFabrica.js";
export class DeclaFabricaService {
  async getAllDeclaFabrica() {
    try {
      const data = await DeclaFabrica.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createDeclaFabrica(cod_decla_fabrica, nomb_decla_fabrica) {
    try {
      const data = await DeclaFabrica.create({
        cod_decla_fabrica: cod_decla_fabrica,
        nomb_decla_fabrica: nomb_decla_fabrica,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de vía.");
    }
  }

  async getDeclaFabricaById(id) {
    try {
      const data = await DeclaFabrica.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateDeclaFabrica(cod_decla_fabrica, updatedFields) {
    try {
      const DeclaFabrica = await this.getDeclaFabricaById(cod_decla_fabrica);
      await DeclaFabrica.update(updatedFields);
      return DeclaFabrica;
    } catch (error) {
      throw new Error("Error al actualizar la declaracion de fabrica.");
    }
  }

  async deleteDeclaFabrica(cod_decla_fabrica) {
    try {
      const DeclaFabrica = await this.getDeclaFabricaById(cod_decla_fabrica);
      await DeclaFabrica.destroy();
      return DeclaFabrica;
    } catch (error) {
      throw new Error("Error al eliminar la declaracion de fabrica.");
    }
  }

  async patchDeclaFabrica(cod_decla_fabrica, updatedFields) {
    try {
      const DeclaFabrica = await this.getDeclaFabricaById(cod_decla_fabrica);
      await DeclaFabrica.update(updatedFields);
      return DeclaFabrica;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la declaracion de fabrica."
      );
    }
  }
}
