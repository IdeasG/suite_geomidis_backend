import FilCronologico from "../../../models/maestros/cultural/filCronologico.js";

export class FilCronologicoService {
  async getAllFilCronologico() {
    try {
      const data = await FilCronologico.findAll();
      return data;
    } catch (error) {
      throw new Error("Error al obtener los datos...." + error);
    }
  }

  async createFilCronologico(cod_fil_cronolog, nomb_fil_cronolog) {
    try {
      const data = await FilCronologico.create({
        cod_fil_cronolog: cod_fil_cronolog,
        nomb_fil_cronolog: nomb_fil_cronolog,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear la filiacion cronologica.");
    }
  }

  async getFilCronologicoById(id) {
    try {
      const data = await FilCronologico.findByPk(id);
      if (!data) {
        throw new Error("Data no encontrada.");
      }
      return data;
    } catch (error) {
      throw new Error("Error al obtener la data por ID.");
    }
  }

  async updateFilCronologico(cod_fil_cronolog, updatedFields) {
    try {
      const FilCronologico = await this.getFilCronologicoById(cod_fil_cronolog);
      await FilCronologico.update(updatedFields);
      return FilCronologico;
    } catch (error) {
      throw new Error("Error al actualizar la filiacion cronologica.");
    }
  }

  async deleteFilCronologico(cod_fil_cronolog) {
    try {
      const FilCronologico = await this.getFilCronologicoById(cod_fil_cronolog);
      await FilCronologico.destroy();
      return FilCronologico;
    } catch (error) {
      throw new Error("Error al eliminar la filiacion cronologica.");
    }
  }

  async patchFilCronologico(cod_fil_cronolog, updatedFields) {
    try {
      const FilCronologico = await this.getFilCronologicoById(cod_fil_cronolog);
      await FilCronologico.update(updatedFields);
      return FilCronologico;
    } catch (error) {
      throw new Error("Error al aplicar el parche la filiacion cronologica.");
    }
  }
}
