import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { TipoMaterialConstService } from "../../../services/maestros/cultural/tipoMaterialConst.js";

const controllerService = new TipoMaterialConstService();

export class TipoMaterialConstController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoMaterialConst();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_mat_const } = req.params;
    try {
      const data = await controllerService.getTipoMaterialConstById(
        cod_mat_const
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_mat_const, nomb_mat_const } = req.body;

    try {
      const data = await controllerService.createTipoMaterialConst(
        cod_mat_const,
        nomb_mat_const
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando el tipo de material de construccion." });
    }
  };

  delete = async (req, res) => {
    const { cod_mat_const } = req.params;

    try {
      const data = await controllerService.deleteTipoMaterialConst(
        cod_mat_const
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando el tipo de material de construccion.",
      });
    }
  };

  update = async (req, res) => {
    const { cod_mat_const } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoMaterialConst(
        cod_mat_const,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el tipo de material de construccion.",
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
