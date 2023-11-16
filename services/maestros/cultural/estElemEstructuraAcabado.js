import EstElemEstructuraAcabado from "../../../models/maestros/cultural/estElemEstructuraAcabado.js";

export class EstElemEstructuraAcabadoService {
  async getAllEstElemEstructuraAcabado() {
    try {
      const data = await EstElemEstructuraAcabado.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEstElemEstructuraAcabado(
    cod_elem_estruc_acab,
    nomb_elem_estruc_acab
  ) {
    try {
      const data = await EstElemEstructuraAcabado.create({
        cod_elem_estruc_acab: cod_elem_estruc_acab,
        nomb_elem_estruc_acab: nomb_elem_estruc_acab,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el estado del elemento estructurado.");
    }
  }

  async getEstElemEstructuraAcabadoById(id) {
    try {
      const data = await EstElemEstructuraAcabado.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateEstElemEstructuraAcabado(
    codEstElemEstructuraAcabado,
    updatedFields
  ) {
    try {
      const EstElemEstructuraAcabado =
        await this.getEstElemEstructuraAcabadoById(codEstElemEstructuraAcabado);
      await EstElemEstructuraAcabado.update(updatedFields);
      return EstElemEstructuraAcabado;
    } catch (error) {
      throw new Error(
        "Error al actualizar el estado del elemento estructurado."
      );
    }
  }

  async deleteEstElemEstructuraAcabado(codEstElemEstructuraAcabado) {
    try {
      const EstElemEstructuraAcabado =
        await this.getEstElemEstructuraAcabadoById(codEstElemEstructuraAcabado);
      await EstElemEstructuraAcabado.destroy();
      return EstElemEstructuraAcabado;
    } catch (error) {
      throw new Error("Error al eliminar el estado del elemento estructurado.");
    }
  }

  async patchEstElemEstructuraAcabado(
    codEstElemEstructuraAcabado,
    updatedFields
  ) {
    try {
      const EstElemEstructuraAcabado =
        await this.getEstElemEstructuraAcabadoById(codEstElemEstructuraAcabado);
      await EstElemEstructuraAcabado.update(updatedFields);
      return EstElemEstructuraAcabado;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche el estado del elemento estructurado."
      );
    }
  }
}
