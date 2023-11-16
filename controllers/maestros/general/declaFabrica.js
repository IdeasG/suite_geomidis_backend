import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { DeclaFabricaService } from "../../../services/maestros/general/declaFabrica.js";

const controllerService = new DeclaFabricaService();

export class DeclaFabricaController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllDeclaFabrica();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_decla_fabrica } = req.params;
    try {
      const data = await controllerService.getDeclaFabricaById(
        cod_decla_fabrica
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_decla_fabrica, nomb_decla_fabrica } = req.body;

    try {
      const data = await controllerService.createDeclaFabrica(
        cod_decla_fabrica,
        nomb_decla_fabrica
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la declaracion de fabrica." });
    }
  };

  delete = async (req, res) => {
    const { cod_decla_fabrica } = req.params;

    try {
      const result = await controllerService.deleteDeclaFabrica(
        cod_decla_fabrica
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la declaracion de fabrica." });
    }
  };

  update = async (req, res) => {
    const { cod_decla_fabrica } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateDeclaFabrica(
        cod_decla_fabrica,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la declaracion de fabrica." });
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
