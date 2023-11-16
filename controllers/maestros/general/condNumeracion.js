import { CondNumeracionService } from "../../../services/maestros/general/condNumeracion.js";
import { redisClient } from "../../../config/redis/redis.js";

const condNumeracionService = new CondNumeracionService();

export class CondNumeracionController {
  constructor() {}

  async getAll(req, res) {
    try {
      const cacheKey = req.originalUrl;
      const deletedKeysCount = await redisClient.del(cacheKey);
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }
      const data = await condNumeracionService.getAllCondNumeracion();
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(data));

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
