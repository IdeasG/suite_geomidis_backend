import { TipoPuertaService } from "../../../services/maestros/general/tipoPuerta.js";
const tipoPuertaService = new TipoPuertaService();

export class TipoPuertaController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await tipoPuertaService.getAllTipoPuertas();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    // Lógica para obtener un elemento por ID de tipo de puerta
  }

  async create(req, res) {
    // Lógica para crear un nuevo tipo de puerta
  }

  async delete(req, res) {
    // Lógica para eliminar un tipo de puerta por ID
  }

  async update(req, res) {
    // Lógica para actualizar un tipo de puerta por ID
  }

  async clearCache(req, res) {
    try {
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
