import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { InterInmuebleService } from "../../../services/maestros/cultural/interInmueble.js";

const controllerService = new InterInmuebleService();

export class InterInmuebleController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllInterInmueble();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_inter_inmueble } = req.params;
    try {
      const data = await controllerService.getInterInmuebleById(
        cod_inter_inmueble
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_inter_inmueble, nomb_inter_inmueble } = req.body;

    try {
      const data = await controllerService.createInterInmueble(
        cod_inter_inmueble,
        nomb_inter_inmueble
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la intervencion del inmueble." });
    }
  };

  delete = async (req, res) => {
    const { cod_inter_inmueble } = req.params;

    try {
      const data = await controllerService.deleteInterInmueble(
        cod_inter_inmueble
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la intervencion del inmueble." });
    }
  };

  update = async (req, res) => {
    const { cod_inter_inmueble } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateInterInmueble(
        cod_inter_inmueble,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la intervencion del inmueble." });
    }
  };
  async clearCache(req, res) {
    try {
      console.log("Errores");
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
