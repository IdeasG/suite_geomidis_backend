import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EstLlenadoService } from "../../../services/maestros/general/estLlenado.js";

const controllerService = new EstLlenadoService();

export class EstLlenadoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEstLlenado();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_est_llenado } = req.params;
    try {
      const data = await controllerService.getEstLlenadoById(cod_est_llenado);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_est_llenado, nomb_est_llenado } = req.body;

    try {
      const data = await controllerService.createEstLlenado(
        cod_est_llenado,
        nomb_est_llenado
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el estado de llenado" });
    }
  };

  delete = async (req, res) => {
    const { cod_est_llenado } = req.params;

    try {
      const result = await controllerService.deleteEstLlenado(cod_est_llenado);

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el estado de llenado" });
    }
  };

  update = async (req, res) => {
    const { cod_est_llenado } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEstLlenado(
        cod_est_llenado,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el estado de llenado" });
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
