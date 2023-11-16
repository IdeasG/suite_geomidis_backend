import "dotenv/config";

import { redisClient } from "../../../config/redis/redis.js";
import { TipoArquitecturaMhcService } from "../../../services/maestros/cultural/tipoArquitecturaMhc.js";

const controllerService = new TipoArquitecturaMhcService();

export class TipoArquitecturaMhcController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoArquitecturaMhc();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_arq_mhc } = req.params;
    try {
      const data = await controllerService.getTipoArquitecturaMhcById(
        cod_tipo_arq_mhc
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_arq_mhc, nomb_tipo_arq_mhc } = req.body;

    try {
      const data = await controllerService.createTipoArquitecturaMhc(
        cod_tipo_arq_mhc,
        nomb_tipo_arq_mhc
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el tipo de arquitectura" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_arq_mhc } = req.params;

    try {
      const data = await controllerService.deleteTipoArquitecturaMhc(
        cod_tipo_arq_mhc
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando el tipo de arquitectura" });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_arq_mhc } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoArquitecturaMhc(
        cod_tipo_arq_mhc,
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
