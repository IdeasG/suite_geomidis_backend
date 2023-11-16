import "dotenv/config";

import { redisClient } from "../../../config/redis/redis.js";
import { UcaService } from "../../../services/maestros/general/uca.js";

const controllerService = new UcaService();

export class UcaController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllUca();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_uca } = req.params;
    try {
      const data = await controllerService.getUcaById(cod_uca);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_uca, nomb_uca } = req.body;

    try {
      const data = await controllerService.createUca(cod_uca, nomb_uca);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el UCA" });
    }
  };

  delete = async (req, res) => {
    const { cod_uca } = req.params;

    try {
      const data = await controllerService.deleteUca(cod_uca);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el UCA" });
    }
  };

  update = async (req, res) => {
    const { cod_uca } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateUca(cod_uca, updatedFields);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el UCA" });
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
