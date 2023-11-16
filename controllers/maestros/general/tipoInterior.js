import { TipoInteriorService } from "../../../services/maestros/general/tipoInterior.js";
import { redisClient } from "../../../config/redis/redis.js";

const tipoInteriorService = new TipoInteriorService();

export class TipoInteriorController {
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
      const data = await tipoInteriorService.getAllTipoInteriores();
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(data));

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
