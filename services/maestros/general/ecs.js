import Ecs from "../../../models/maestros/general/ecs.js";
export class EcsService {
  async getAllEcs() {
    try {
      const data = await Ecs.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createEcs(cod_ecs, nomb_ecs) {
    try {
      const data = await Ecs.create({
        cod_ecs: cod_ecs,
        nomb_ecs: nomb_ecs,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el ECS.");
    }
  }

  async getEcsById(id) {
    try {
      const data = await Ecs.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateEcs(cod_ecs, updatedFields) {
    try {
      const Ecs = await this.getEcsById(cod_ecs);
      await Ecs.update(updatedFields);
      return Ecs;
    } catch (error) {
      throw new Error("Error al actualizar el ECS.");
    }
  }

  async deleteEcs(cod_ecs) {
    try {
      const Ecs = await this.getEcsById(cod_ecs);
      await Ecs.destroy();
      return Ecs;
    } catch (error) {
      throw new Error("Error al eliminar el ECS.");
    }
  }

  async patchEcs(cod_ecs, updatedFields) {
    try {
      const Ecs = await this.getEcsById(cod_ecs);
      await Ecs.update(updatedFields);
      return Ecs;
    } catch (error) {
      throw new Error("Error al aplicar el parche al ECS.");
    }
  }
}
