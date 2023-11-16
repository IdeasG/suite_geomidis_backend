import IdentConductor from "../../../models/fichas/economico/identConductor.js";

export class IndentConductorService {
  async getById(id_ficha) {
    try {
      const data = await IdentConductor.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return {
        data: {
          data,
        },
      };
    } catch (error) {
      throw new Error("Error al obtener la data...." + error);
    }
  }
}
