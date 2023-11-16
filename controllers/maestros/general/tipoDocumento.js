import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { TipoDocumentoService } from "../../../services/maestros/general/tipoDocumento.js";

const controllerService = new TipoDocumentoService();

export class TipoDocumentoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoDocumento();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_doc } = req.params;
    try {
      const data = await controllerService.getTipoDocumentoById(cod_tipo_doc);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_doc, nomb_tipo_doc } = req.body;

    try {
      const data = await controllerService.createTipoDocumento(
        cod_tipo_doc,
        nomb_tipo_doc
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el tipo de documento" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_doc } = req.params;
    try {
      const result = await controllerService.deleteTipoDocumento(cod_tipo_doc);

      if (!result) {
        return res.status(404).json({ message: "Data no elimnana" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la data" });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_doc } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoDocumento(
        cod_tipo_doc,
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
