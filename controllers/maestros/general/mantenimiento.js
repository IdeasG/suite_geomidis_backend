import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { MantenimientoService } from "../../../services/maestros/general/mantenimiento.js";

const controllerService = new MantenimientoService();
export class MantenimientoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllMantenimiento();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_mantenimiento } = req.params;
    try {
      const data = await controllerService.getMantenimientoById(
        cod_mantenimiento
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_mantenimiento, nomb_mantenimiento } = req.body;

    try {
      const data = await controllerService.createMantenimiento(
        cod_mantenimiento,
        nomb_mantenimiento
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando mantenimiento" });
    }
  };

  delete = async (req, res) => {
    const { cod_mantenimiento } = req.params;
    try {
      const result = await controllerService.deleteMantenimiento(
        cod_mantenimiento
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }
      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando mantenimiento" });
    }
  };

  update = async (req, res) => {
    const { cod_mantenimiento } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateMantenimiento(
        cod_mantenimiento,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando mantenimiento" });
    }
  };

  async clearCache(req, res) {
    try {
      const cacheKey = req.originalUrl;
      const deletedKeysCount = await redisClient.del(cacheKey);

      if (deletedKeysCount === 1) {
        return res.json({ message: "Caché eliminado con éxito" });
      } else {
        return res.json({ message: "La clave de caché no fue encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
