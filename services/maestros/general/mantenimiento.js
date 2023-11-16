import Mantenimiento from "../../../models/maestros/general/mantenimiento.js";
export class MantenimientoService {
  async getAllMantenimiento() {
    try {
      const data = await Mantenimiento.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createMantenimiento(cod_mantenimiento, nomb_mantenimiento) {
    try {
      const data = await Mantenimiento.create({
        cod_mantenimiento: cod_mantenimiento,
        nomb_mantenimiento: nomb_mantenimiento,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear mantenimiento");
    }
  }

  async getMantenimientoById(id) {
    try {
      const data = await Mantenimiento.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateMantenimiento(cod_mantenimiento, updatedFields) {
    try {
      const Mantenimiento = await this.getMantenimientoById(cod_mantenimiento);
      await Mantenimiento.update(updatedFields);
      return Mantenimiento;
    } catch (error) {
      throw new Error("Error al actualizar mantenimiento.");
    }
  }

  async deleteMantenimiento(cod_mantenimiento) {
    try {
      const Mantenimiento = await this.getMantenimientoById(cod_mantenimiento);
      await Mantenimiento.destroy();
      return Mantenimiento;
    } catch (error) {
      throw new Error("Error al eliminar mantenimiento.");
    }
  }

  async patchMantenimiento(codMantenimiento, updatedFields) {
    try {
      const Mantenimiento = await this.getMantenimientoById(codMantenimiento);
      await Mantenimiento.update(updatedFields);
      return Mantenimiento;
    } catch (error) {
      throw new Error("Error al aplicar el parche al mantenimiento.");
    }
  }
}
