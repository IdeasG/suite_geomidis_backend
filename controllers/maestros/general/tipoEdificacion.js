import { TipoEdificacionService } from "../../../services/maestros/general/tipoEdificacion.js";
const tipoEdificacionService = new TipoEdificacionService();

export class TipoEdificacionController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await tipoEdificacionService.getAllTipoEdificaciones();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    // Lógica para obtener un elemento por ID de tipo de edificación
  }

  async create(req, res) {
    // Lógica para crear un nuevo tipo de edificación
  }

  async delete(req, res) {
    // Lógica para eliminar un tipo de edificación por ID
  }

  async update(req, res) {
    // Lógica para actualizar un tipo de edificación por ID
  }
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
