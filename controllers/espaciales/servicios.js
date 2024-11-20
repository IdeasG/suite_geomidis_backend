import { ServiciosService } from "../../services/espaciales/servicios.js";

const serviciosService = new ServiciosService();

export class ServiciosController {
  constructor() {}

  async buscarServicios(req, res) {
    const { tipo, search } = req.params;
    try {
      const data = await serviciosService.buscarServicios(tipo, search);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}