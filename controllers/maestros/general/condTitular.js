import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { CondTitularService } from "../../../services/maestros/general/condTitular.js";

const controllerService = new CondTitularService();
export class CondTitularController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllCondTitular();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_cond } = req.params;
    try {
      const data = await controllerService.getCondTitularById(cod_cond);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_cond, nomb_cond } = req.body;

    try {
      const data = await controllerService.createCondTitular(
        cod_cond,
        nomb_cond
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la condicion del titular" });
    }
  };

  delete = async (req, res) => {
    const { cod_cond } = req.params;

    try {
      const result = await controllerService.deleteCondTitular(cod_cond);

      if (!result) {
        return res.status(404).json({ message: "Data no eliminada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la data" });
    }
  };

  update = async (req, res) => {
    const { cod_cond } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateCondTitular(
        cod_cond,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando la data" });
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
