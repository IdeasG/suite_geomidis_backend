import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { PredioCatEnService } from "../../../services/maestros/general/predioCatEn.js";

const controllerService = new PredioCatEnService();
export class PredioCatEnController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllPredioCatEn();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_predio_cat_en } = req.params;
    try {
      const data = await controllerService.getPredioCatEnById(
        cod_predio_cat_en
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_predio_cat_en, nomb_predio_cat_en } = req.body;

    try {
      const data = await controllerService.createPredioCatEn(
        cod_predio_cat_en,
        nomb_predio_cat_en
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el predio catastral en." });
    }
  };

  delete = async (req, res) => {
    const { cod_predio_cat_en } = req.params;

    try {
      const result = await controllerService.deletePredioCatEn(
        cod_predio_cat_en
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando el predio catastral en." });
    }
  };

  update = async (req, res) => {
    const { cod_predio_cat_en } = req.params;
    const updatedFields = req.body;
    try {
      const updatedPredioCatEn = await controllerService.updatePredioCatEn(
        cod_predio_cat_en,
        updatedFields
      );
      return res.json(updatedPredioCatEn);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el predio catastral en." });
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
