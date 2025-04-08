import { CondNumeracionService } from "../../../services/maestros/general/condNumeracion.js";
const condNumeracionService = new CondNumeracionService();

export class CondNumeracionController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await condNumeracionService.getAllCondNumeracion();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    // Lógica para obtener un elemento por ID de condición de numeración
  }

  async create(req, res) {
    // Lógica para crear una nueva condición de numeración
  }

  async delete(req, res) {
    // Lógica para eliminar una condición de numeración por ID
  }

  async update(req, res) {
    // Lógica para actualizar una condición de numeración por ID
  }
  async clearCache(req, res) {
    try {

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
