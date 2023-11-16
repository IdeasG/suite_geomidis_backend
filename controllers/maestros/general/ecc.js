import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EccService } from "../../../services/maestros/general/ecc.js";

const controllerService = new EccService();

export class EccController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEcc();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_ecc } = req.params;
    try {
      const data = await controllerService.getEccById(cod_ecc);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_ecc, nomb_ecc } = req.body;

    try {
      const data = await controllerService.createEcc(cod_ecc, nomb_ecc);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el ECC" });
    }
  };

  delete = async (req, res) => {
    const { cod_ecc } = req.params;
    try {
      const data = await controllerService.deleteEcc(cod_ecc);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el ECC" });
    }
  };

  update = async (req, res) => {
    const { cod_ecc } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEcc(cod_ecc, updatedFields);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el ECC" });
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
