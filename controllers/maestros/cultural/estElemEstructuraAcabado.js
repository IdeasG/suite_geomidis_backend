import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { EstElemEstructuraAcabadoService } from "../../../services/maestros/cultural/estElemEstructuraAcabado.js";

const controllerService = new EstElemEstructuraAcabadoService();

export class EstElemEstructuraAcabadoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEstElemEstructuraAcabado();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_elem_estruc_acab } = req.params;
    try {
      const data = await controllerService.getEstElemEstructuraAcabadoById(
        cod_elem_estruc_acab
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_elem_estruc_acab, nomb_elem_estruc_acab } = req.body;

    try {
      const data = await controllerService.createEstElemEstructuraAcabado(
        cod_elem_estruc_acab,
        nomb_elem_estruc_acab
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        error: "Error creando el estado del elemento de la estructura.",
      });
    }
  };

  delete = async (req, res) => {
    const { cod_elem_estruc_acab } = req.params;

    try {
      const data = await controllerService.deleteEstElemEstructuraAcabado(
        cod_elem_estruc_acab
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({
        error: "Error eliminando el estado del elemento de la estructura",
      });
    }
  };

  update = async (req, res) => {
    const { cod_elem_estruc_acab } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEstElemEstructuraAcabado(
        cod_elem_estruc_acab,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res.status(500).json({
        error: "Error actualizando el estado del elemento de la estructura",
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
