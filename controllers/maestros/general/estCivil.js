import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EstCivilService } from "../../../services/maestros/general/estCivil.js";

const controllerService = new EstCivilService();

export class EstCivilController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEstCivil();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_est_civil } = req.params;
    try {
      const data = await controllerService.getEstCivilById(cod_est_civil);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_est_civil, nomb_est_civil } = req.body;

    try {
      const data = await controllerService.createEstCivil(
        cod_est_civil,
        nomb_est_civil
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el estado civil" });
    }
  };

  delete = async (req, res) => {
    const { cod_est_civil } = req.params;

    try {
      const result = await controllerService.deleteEstCivil(cod_est_civil);

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la data" });
    }
  };

  update = async (req, res) => {
    const { cod_est_civil } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEstCivil(
        cod_est_civil,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el estado civil" });
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
