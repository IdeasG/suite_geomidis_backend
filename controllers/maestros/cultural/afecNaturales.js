import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { AfecNaturalesService } from "../../../services/maestros/cultural/afecNaturales.js";

const controllerService = new AfecNaturalesService();

export class AfecNaturalesController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllAfecNaturales();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_afec_natural } = req.params;
    try {
      const data = await controllerService.getAfecNaturalesById(
        cod_afec_natural
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_afec_natural, nomb_afec_natural } = req.body;

    try {
      const data = await controllerService.createAfecNaturales(
        cod_afec_natural,
        nomb_afec_natural
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la afectacion natural." });
    }
  };

  delete = async (req, res) => {
    const { cod_afec_natural } = req.params;

    try {
      const result = await controllerService.deleteAfecNaturales(
        cod_afec_natural
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la afectacion natural." });
    }
  };

  update = async (req, res) => {
    const { cod_afec_natural } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateAfecNaturales(
        cod_afec_natural,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la afectacion natural." });
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
