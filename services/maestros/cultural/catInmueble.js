import CatInmueble from "../../../models/maestros/cultural/catInmueble.js";
export class CatInmuebleService {
  async getAllCatInmueble() {
    try {
      const data = await CatInmueble.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createCatInmueble(cod_cat_inmueble, nomb_cat_inmueble) {
    try {
      const data = await CatInmueble.create({
        cod_cat_inmueble: cod_cat_inmueble,
        nomb_cat_inmueble: nomb_cat_inmueble,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la categoria del inmueble.");
    }
  }

  async getCatInmuebleById(id) {
    try {
      const data = await CatInmueble.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateCatInmueble(cod_cat_inmueble, updatedFields) {
    try {
      const CatInmueble = await this.getCatInmuebleById(cod_cat_inmueble);
      await CatInmueble.update(updatedFields);
      return CatInmueble;
    } catch (error) {
      throw new Error("Error al actualizar la categoria del inmueble.");
    }
  }

  async deleteCatInmueble(cod_cat_inmueble) {
    try {
      const CatInmueble = await this.getCatInmuebleById(cod_cat_inmueble);
      await CatInmueble.destroy();
      return CatInmueble;
    } catch (error) {
      throw new Error("Error al eliminar la categoria del inmueble.");
    }
  }

  async patchCatInmueble(cod_cat_inmueble, updatedFields) {
    try {
      const CatInmueble = await this.getCatInmuebleById(cod_cat_inmueble);
      await CatInmueble.update(updatedFields);
      return CatInmueble;
    } catch (error) {
      throw new Error(
        "Error al aplicar el parche a la categoria del inmueble."
      );
    }
  }
}
