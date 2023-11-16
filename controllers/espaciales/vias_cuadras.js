import { ViasCuadrasService } from "../../services/espaciales/vias_cuadras.js";

const viasCuadrasService = new ViasCuadrasService();

export class ViasCuadrasController {
  constructor() {}

  async getTipoVias(req, res) {
    try {
      const data = await viasCuadrasService.getTipoVias();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVias(req, res) {
    try {
      const data = await viasCuadrasService.getVias(req);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCuadras(req, res) {
    try {
      const data = await viasCuadrasService.getCuadras(req);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
