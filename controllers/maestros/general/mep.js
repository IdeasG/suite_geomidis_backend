import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { MepService } from "../../../services/maestros/general/mep.js";

const controllerService = new MepService();
export class MepController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllMep();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_mep } = req.params;
    try {
      const data = await controllerService.getMepById(cod_mep);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_mep, nomb_mep } = req.body;

    try {
      const data = await controllerService.createMep(cod_mep, nomb_mep);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el MEP" });
    }
  };

  delete = async (req, res) => {
    const { cod_mep } = req.params;

    try {
      const data = await controllerService.deleteMep(cod_mep);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el MEP" });
    }
  };

  update = async (req, res) => {
    const { cod_mep } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateMep(cod_mep, updatedFields);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el MEP" });
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
