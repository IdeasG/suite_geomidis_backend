import TipoMaterialConst from "../../../models/maestros/cultural/tipoMaterialConst.js";
export class TipoMaterialConstService {
  async getAllTipoMaterialConst() {
    try {
      const data = await TipoMaterialConst.findAll();

      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createTipoMaterialConst(cod_mat_const, nomb_mat_const) {
    try {
      const data = await TipoMaterialConst.create({
        cod_mat_const: cod_mat_const,
        nomb_mat_const: nomb_mat_const,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el tipo de material de construccion.");
    }
  }

  async getTipoMaterialConstById(id) {
    try {
      const data = await TipoMaterialConst.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateTipoMaterialConst(cod_mat_const, updatedFields) {
    try {
      const TipoMaterialConst = await this.getTipoMaterialConstById(
        cod_mat_const
      );
      await TipoMaterialConst.update(updatedFields);
      return TipoMaterialConst;
    } catch (error) {
      throw new Error(
        "Error al actualizar el tipo de material de construccion."
      );
    }
  }

  async deleteTipoMaterialConst(cod_mat_const) {
    try {
      const TipoMaterialConst = await this.getTipoMaterialConstById(
        cod_mat_const
      );
      await TipoMaterialConst.destroy();
      return TipoMaterialConst;
    } catch (error) {
      throw new Error("Error al eliminar el tipo de material de construccion.");
    }
  }

  async patchTipoMaterialConst(cod_mat_const, updatedFields) {
    try {
      const TipoMaterialConst = await this.getTipoMaterialConstById(
        cod_mat_const
      );
      await TipoMaterialConst.update(updatedFields);
      return TipoMaterialConst;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche al tipo de material de construccion."
      );
    }
  }
}
