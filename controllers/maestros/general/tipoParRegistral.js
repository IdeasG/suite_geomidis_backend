import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { TipoParRegistralService } from "../../../services/maestros/general/tipoParRegistral.js";

const controllerService = new TipoParRegistralService();
export class TipoParRegistralController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoParRegistral();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_parregistral } = req.params;
    try {
      const data = await controllerService.getTipoParRegistralById(
        cod_tipo_parregistral
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_parregistral, nomb_tipo_parregistral } = req.body;

    try {
      const data = await controllerService.createTipoParRegistral(
        cod_tipo_parregistral,
        nomb_tipo_parregistral
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la partida registral" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_parregistral } = req.params;

    try {
      const data = await controllerService.deleteTipoParRegistral(
        cod_tipo_parregistral
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la partida registral." });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_parregistral } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoParRegistral(
        cod_tipo_parregistral,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la partida registral." });
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
