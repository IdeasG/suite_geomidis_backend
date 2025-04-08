import { TipoInteriorService } from "../../../services/maestros/general/tipoInterior.js";

const tipoInteriorService = new TipoInteriorService();

export class TipoInteriorController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await tipoInteriorService.getAllTipoInteriores();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    // Lógica para obtener un elemento por ID de tipo interior
  }

  async create(req, res) {
    // Lógica para crear un nuevo tipo interior
  }

  async delete(req, res) {
    // Lógica para eliminar un tipo interior por ID
  }

  async update(req, res) {
    // Lógica para actualizar un tipo interior por ID
  }
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
