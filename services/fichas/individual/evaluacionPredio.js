import EvaluacionPredio from "../../../models/fichas/individual/evaluacionPredio.js";

export class EvaluacionPredioService {
  async getEvaluacion(id_ficha) {
    try {
      const data = await EvaluacionPredio.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Error al obtener el servicio.");
    }
  }

  async addEvaluacion(
    id_ficha,
    cod_tipo_eval_predio,
    n_inv_area_colindante,
    n_inv_area_jard_aisla,
    n_inv_area_publica,
    n_inv_area_intangible
  ) {
    try {
      const data = await EvaluacionPredio.create({
        id_ficha,
        cod_tipo_eval_predio,
        n_inv_area_colindante,
        n_inv_area_jard_aisla,
        n_inv_area_publica,
        n_inv_area_intangible,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el servicio.");
    }
  }

  async updateEvaluacion(
    id_ficha,
    cod_tipo_eval_predio,
    n_inv_area_colindante,
    n_inv_area_jard_aisla,
    n_inv_area_publica,
    n_inv_area_intangible,
    id_evaluacion
  ) {
    try {
      const [updatedRowsCount] = await EvaluacionPredio.update(
        {
          id_ficha,
          cod_tipo_eval_predio,
          n_inv_area_colindante,
          n_inv_area_jard_aisla,
          n_inv_area_publica,
          n_inv_area_intangible,
        },
        {
          where: {
            id_evaluacion: id_evaluacion,
          },
        }
      );
      return updatedRowsCount;
    } catch (error) {
      throw new Error("Error al actualizar el servicio.");
    }
  }
}
