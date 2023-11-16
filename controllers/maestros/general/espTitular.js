import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EspTitularService } from "../../../services/maestros/general/espTitular.js";

const controllerService = new EspTitularService();

export class EspTitularController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEspTitular();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_cond_esp_tit } = req.params;
    try {
      const data = await controllerService.getEspTitularById(cod_cond_esp_tit);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_cond_esp_tit, nomb_cond_esp_tit } = req.body;

    try {
      const data = await controllerService.createEspTitular(
        cod_cond_esp_tit,
        nomb_cond_esp_tit
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la condicion especial del titular." });
    }
  };

  delete = async (req, res) => {
    const { cod_cond_esp_tit } = req.params;

    try {
      const result = await controllerService.deleteEspTitular(cod_cond_esp_tit);

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la condicion especial del titular" });
    }
  };

  update = async (req, res) => {
    const { cod_cond_esp_tit } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEspTitular(
        cod_cond_esp_tit,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando la condicion especial del titular",
      });
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
