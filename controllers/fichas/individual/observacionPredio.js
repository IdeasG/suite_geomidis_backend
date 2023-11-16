import "dotenv/config";

import { ObservacionPredioService } from "../../../services/fichas/individual/observacionPredio.js";

const observacionPredioService = new ObservacionPredioService();

export class ObservacionPredioController {
  constructor() {}

  async getObservacion(req, res) {
    const { id_ficha } = req.query;
    try {
      const data = await observacionPredioService.getObservacion(id_ficha);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addObservacion(req, res) {
    const { id_ficha, c_observaciones } = req.body;

    try {
      const data = await observacionPredioService.addObservacion(
        id_ficha,
        c_observaciones
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando servicios." });
    }
  }

  async putObservacion(req, res) {
    const { id_observaciones } = req.params;
    const { id_ficha, c_observaciones } = req.body;

    try {
      const data = await observacionPredioService.updateObservacion(
        id_ficha,
        c_observaciones,
        id_observaciones
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando servicio: " + error });
    }
  }
}
