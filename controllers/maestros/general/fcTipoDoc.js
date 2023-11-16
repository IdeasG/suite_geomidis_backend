import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { FcTipoDocService } from "../../../services/maestros/general/fcTipoDoc.js";

const controllerService = new FcTipoDocService();
export class FcTipoDocController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllFcTipoDoc();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_fc_tipo_doc } = req.params;
    try {
      const data = await controllerService.getFcTipoDocById(cod_fc_tipo_doc);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_fc_tipo_doc, nomb_fc_tipo_doc } = req.body;

    try {
      const data = await controllerService.createFcTipoDoc(
        cod_fc_tipo_doc,
        nomb_fc_tipo_doc
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el Tipo de documento." });
    }
  };

  delete = async (req, res) => {
    const { cod_fc_tipo_doc } = req.params;

    try {
      const data = await controllerService.deleteFcTipoDoc(cod_fc_tipo_doc);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el tipo de documento" });
    }
  };

  update = async (req, res) => {
    const { cod_fc_tipo_doc } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateFcTipoDoc(
        cod_fc_tipo_doc,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el tipo de documento" });
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
