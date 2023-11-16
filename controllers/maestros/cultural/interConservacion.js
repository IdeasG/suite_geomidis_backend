import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { InterConservacionService } from "../../../services/maestros/cultural/interConservacion.js";

const controllerService = new InterConservacionService();

export class InterConservacionController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllInterConservacion();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_interv_conserv } = req.params;
    try {
      const data = await controllerService.getInterConservacionById(
        cod_interv_conserv
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_interv_conserv, nomb_inter_conserv } = req.body;

    try {
      const data = await controllerService.createInterConservacion(
        cod_interv_conserv,
        nomb_inter_conserv
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la intervencion de conservacion." });
    }
  };

  delete = async (req, res) => {
    const { cod_interv_conserv } = req.params;

    try {
      const data = await controllerService.deleteInterConservacion(
        cod_interv_conserv
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la intervencion de conservacion." });
    }
  };

  update = async (req, res) => {
    const { cod_interv_conserv } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateInterConservacion(
        cod_interv_conserv,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la intervencion de conservacion." });
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
