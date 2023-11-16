import "dotenv/config";

import { EvaluacionPredioService } from "../../../services/fichas/individual/evaluacionPredio.js";

const evaluacionPredioService = new EvaluacionPredioService();

export class EvaluacionPredioController {
  constructor() {}

  async getEvaluacion(req, res) {
    const { id_ficha } = req.query;
    try {
      const data = await evaluacionPredioService.getEvaluacion(id_ficha);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addEvaluacion(req, res) {
    const {
      id_ficha,
      cod_tipo_eval_predio,
      n_inv_area_colindante,
      n_inv_area_jard_aisla,
      n_inv_area_publica,
      n_inv_area_intangible,
    } = req.body;

    try {
      const data = await evaluacionPredioService.addEvaluacion(
        id_ficha,
        cod_tipo_eval_predio,
        n_inv_area_colindante,
        n_inv_area_jard_aisla,
        n_inv_area_publica,
        n_inv_area_intangible
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando servicios." });
    }
  }

  async putEvaluacion(req, res) {
    const { id_evaluacion } = req.params;
    const {
      id_ficha,
      cod_tipo_eval_predio,
      n_inv_area_colindante,
      n_inv_area_jard_aisla,
      n_inv_area_publica,
      n_inv_area_intangible,
    } = req.body;

    try {
      const data = await evaluacionPredioService.updateEvaluacion(
        id_ficha,
        cod_tipo_eval_predio,
        n_inv_area_colindante,
        n_inv_area_jard_aisla,
        n_inv_area_publica,
        n_inv_area_intangible,
        id_evaluacion
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando servicio: " + error });
    }
  }
}
