import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { TipoArquitecturaMapService } from "../../../services/maestros/cultural/tipoArquitecturaMap.js";

const controllerService = new TipoArquitecturaMapService();

export class TipoArquitecturaMapController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoArquitecturaMap();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_arq_map } = req.params;
    try {
      const data = await controllerService.getTipoArquitecturaMapById(
        cod_tipo_arq_map
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_arq_map, nomb_tipo_arq_map } = req.body;

    try {
      const data = await controllerService.createTipoArquitecturaMap(
        cod_tipo_arq_map,
        nomb_tipo_arq_map
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el tipo de arquitectura." });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_arq_map } = req.params;

    try {
      const result = await controllerService.deleteTipoArquitecturaMap(
        cod_tipo_arq_map
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando el tipo de arquitectura." });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_arq_map } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoArquitecturaMap(
        cod_tipo_arq_map,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el tipo de arquitectura." });
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
