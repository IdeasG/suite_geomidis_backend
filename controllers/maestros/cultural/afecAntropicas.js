import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { AfecAntropicasService } from "../../../services/maestros/cultural/afecAntropicas.js";

const controllerService = new AfecAntropicasService();

export class AfecAntropicasController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllAfecAntropicas();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_afec_antrop } = req.params;
    try {
      const data = await controllerService.getAfecAntropicasById(
        cod_afec_antrop
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_afec_antrop, nomb_afec_antrop } = req.body;

    try {
      const data = await controllerService.createAfecAntropicas(
        cod_afec_antrop,
        nomb_afec_antrop
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la afectacion antropica." });
    }
  };

  delete = async (req, res) => {
    const { cod_afec_antrop } = req.params;

    try {
      const data = await controllerService.deleteAfecAntropicas(
        cod_afec_antrop
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la afectacion antropica" });
    }
  };

  update = async (req, res) => {
    const { cod_afec_antrop } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateAfecAntropicas(
        cod_afec_antrop,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la afectacion antropica." });
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
