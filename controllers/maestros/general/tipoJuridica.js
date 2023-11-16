import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { TipoJuridicaService } from "../../../services/maestros/general/tipoJuridica.js";

const controllerService = new TipoJuridicaService();
export class TipoJuridicaController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoJuridica();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_perjuridica } = req.params;
    try {
      const data = await controllerService.getTipoJuridicaById(
        cod_tipo_perjuridica
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_perjuridica, nomb_tipo_perjuridica } = req.body;

    try {
      const data = await controllerService.createTipoJuridica(
        cod_tipo_perjuridica,
        nomb_tipo_perjuridica
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando el tipo de persona juridica" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_perjuridica } = req.params;

    try {
      const result = await controllerService.deleteTipoJuridica(
        cod_tipo_perjuridica
      );
      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }
      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando el tipo de persona juridica" });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_perjuridica } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoJuridica(
        cod_tipo_perjuridica,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el tipo de persona juridica" });
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
