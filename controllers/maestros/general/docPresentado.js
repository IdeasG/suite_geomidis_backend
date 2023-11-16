import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { DocPresentadoService } from "../../../services/maestros/general/docPresentado.js";

const controllerService = new DocPresentadoService();

export class DocPresentadoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllDocPresentado();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_doc_presentado } = req.params;
    try {
      const data = await controllerService.getDocPresentadoById(
        cod_doc_presentado
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_doc_presentado, nomb_doc_presentado } = req.body;

    try {
      const data = await controllerService.createDocPresentado(
        cod_doc_presentado,
        nomb_doc_presentado
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el documento presentado" });
    }
  };

  delete = async (req, res) => {
    const { cod_doc_presentado } = req.params;
    try {
      const result = await controllerService.deleteDocPresentado(
        cod_doc_presentado
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
    const { cod_doc_presentado } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateDocPresentado(
        cod_doc_presentado,
        updatedFields
      );
      return res.json(data);
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
