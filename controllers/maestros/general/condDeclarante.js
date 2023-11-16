import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { CondDeclaranteService } from "../../../services/maestros/general/condDeclarante.js";

const controllerService = new CondDeclaranteService();
export class CondDeclaranteController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllCondDeclarante();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_cond_decla } = req.params;
    try {
      const data = await controllerService.getCondDeclaranteById(
        cod_cond_decla
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_cond_decla, nomb_cond_decla } = req.body;

    try {
      const data = await controllerService.createCondDeclarante(
        cod_cond_decla,
        nomb_cond_decla
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la condicion del declarante" });
    }
  };

  delete = async (req, res) => {
    const { cod_cond_decla } = req.params;

    try {
      const result = await controllerService.deleteCondDeclarante(
        cod_cond_decla
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la data" });
    }
  };

  update = async (req, res) => {
    const { cod_cond_decla } = req.params;
    const updatedFields = req.body;

    try {
      const CondDeclarante = await controllerService.updateCondDeclarante(
        cod_cond_decla,
        updatedFields
      );
      return res.json(CondDeclarante);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando la data" });
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
