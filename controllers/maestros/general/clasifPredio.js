import "dotenv/config";
import { ClasifPredioService } from "../../../services/maestros/general/clasifPredio.js";

const controllerService = new ClasifPredioService();
export class ClasifPredioController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllClasifPredio();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_clasif_predio } = req.params;
    try {
      const data = await controllerService.getClasifPredioById(
        cod_clasif_predio
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_clasif_predio, nomb_clasif_predio } = req.body;

    try {
      const data = await controllerService.createClasifPredio(
        cod_clasif_predio,
        nomb_clasif_predio
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la clasificacion del predio." });
    }
  };

  delete = async (req, res) => {
    const { cod_clasif_predio } = req.params;
    try {
      const data = await controllerService.deleteClasifPredio(
        cod_clasif_predio
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }
      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la clasificacion del predio." });
    }
  };

  update = async (req, res) => {
    const { cod_clasif_predio } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateClasifPredio(
        cod_clasif_predio,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la clasificacion del predio" });
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
