import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EspPredioService } from "../../../services/maestros/general/espPredio.js";

const controllerService = new EspPredioService();

export class EspPredioController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEspPredio();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_cond_esp_predio } = req.params;
    try {
      const data = await controllerService.getEspPredioById(
        cod_cond_esp_predio
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_cond_esp_predio, nomb_cond_esp_predio } = req.body;

    try {
      const data = await controllerService.createEspPredio(
        cod_cond_esp_predio,
        nomb_cond_esp_predio
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la condicion especial del predio." });
    }
  };

  delete = async (req, res) => {
    const { cod_cond_esp_predio } = req.params;

    try {
      const data = await controllerService.deleteEspPredio(cod_cond_esp_predio);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la condicion especial del predio" });
    }
  };

  update = async (req, res) => {
    const { cod_cond_esp_predio } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEspPredio(
        cod_cond_esp_predio,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la condicion especial del predio" });
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
