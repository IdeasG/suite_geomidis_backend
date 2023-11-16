import "dotenv/config";

import { validatePagination } from "../../../schemas/generales/pagination.js";

import { TipoViaService } from "../../../services/maestros/general/tipoVias.js";

import { redisClient } from "../../../config/redis/redis.js";

const tipoViaService = new TipoViaService();

export class TipoViaController {
  constructor() {}

  async getAll(req, res) {
    const result = validatePagination(req.query);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { page = 1, pageSize = 5 } = result.data;
    try {
      const cacheKey = req.originalUrl;
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }
      const tipoVias = await tipoViaService.getAllTipoVias(page, pageSize);
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(tipoVias));

      res.json(tipoVias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_via } = req.params;
    try {
      const tipoVia = await tipoViaService.getTipoViaById(cod_tipo_via);
      if (tipoVia) return res.json(tipoVia);
      res.status(404).json({ message: "Tipo de vía no encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const result = validateTipoVia(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const { cod_tipo_via, nomb_tipo_via } = result.data;

    try {
      const newTipoVia = await tipoViaService.createTipoVia(
        cod_tipo_via,
        nomb_tipo_via
      );
      res.status(201).json(newTipoVia);
    } catch (error) {
      res.status(500).json({ error: "Error creando el tipo de vía" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_via } = req.params;

    try {
      const result = await tipoViaService.deleteTipoVia(cod_tipo_via);

      if (!result) {
        return res.status(404).json({ message: "Tipo de vía no encontrado" });
      }

      return res.json({ message: "Tipo de vía eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el tipo de vía" });
    }
  };

  update = async (req, res) => {
    const result = validatePartialTipoVia(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const { cod_tipo_via } = req.params;
    const updatedFields = result.data;

    try {
      const updatedTipoVia = await tipoViaService.updateTipoVia(
        cod_tipo_via,
        updatedFields
      );
      return res.json(updatedTipoVia);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el tipo de vía" });
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
