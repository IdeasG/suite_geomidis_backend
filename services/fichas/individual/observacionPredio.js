import ObservacionPredio from "../../../models/fichas/individual/observacionPredio.js";

export class ObservacionPredioService {
  async getObservacion(id_ficha) {
    try {
      const data = await ObservacionPredio.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Error al obtener el servicio.");
    }
  }

  async addObservacion(id_ficha, c_observaciones) {
    try {
      const data = await ObservacionPredio.create({
        id_ficha,
        c_observaciones,
      });
      return data;
    } catch (error) {
      throw new Error("Error al crear el servicio.");
    }
  }

  async updateObservacion(id_ficha, c_observaciones, id_observaciones) {
    try {
      const [updatedRowsCount] = await ObservacionPredio.update(
        {
          id_ficha,
          c_observaciones,
        },
        {
          where: {
            id_observaciones: id_observaciones,
          },
        }
      );
      return updatedRowsCount;
    } catch (error) {
      throw new Error("Error al actualizar el servicio.");
    }
  }
}
