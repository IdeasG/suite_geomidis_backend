import "dotenv/config";

import { redisClient } from "../../../config/redis/redis.js";
import { FilEstilisticaService } from "../../../services/maestros/cultural/filEstilistica.js";

const controllerService = new FilEstilisticaService();

export class FilEstilisticaController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllFilEstilistica();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_fil_estilistica } = req.params;
    try {
      const data = await controllerService.getFilEstilisticaById(
        cod_fil_estilistica
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_fil_estilistica, nomb_fil_estilistica } = req.body;

    try {
      const data = await controllerService.createFilEstilistica(
        cod_fil_estilistica,
        nomb_fil_estilistica
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la filiacion estilistica." });
    }
  };

  delete = async (req, res) => {
    const { cod_fil_estilistica } = req.params;

    try {
      const data = await controllerService.deleteFilEstilistica(
        cod_fil_estilistica
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la filiacion estilistica." });
    }
  };

  update = async (req, res) => {
    const { cod_fil_estilistica } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateFilEstilistica(
        cod_fil_estilistica,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la filiacion estilistica." });
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
