import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { FilCronologicoService } from "../../../services/maestros/cultural/filCronologico.js";

const controllerService = new FilCronologicoService();

export class FilCronologicoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllFilCronologico();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_fil_cronolog } = req.params;
    try {
      const data = await controllerService.getFilCronologicoById(
        cod_fil_cronolog
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_fil_cronolog, nomb_fil_cronolog } = req.body;

    try {
      const data = await controllerService.createFilCronologico(
        cod_fil_cronolog,
        nomb_fil_cronolog
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la filiacion cronologia" });
    }
  };

  delete = async (req, res) => {
    const { cod_fil_cronolog } = req.params;

    try {
      const result = await controllerService.deleteFilCronologico(
        cod_fil_cronolog
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la filiacion cronologica" });
    }
  };

  update = async (req, res) => {
    const { cod_fil_cronolog } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateFilCronologico(
        cod_fil_cronolog,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la filiacion cronologica" });
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
