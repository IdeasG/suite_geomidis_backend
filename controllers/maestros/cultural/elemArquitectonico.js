import "dotenv/config";
import { redisClient } from "../../../config/redis/redis.js";
import { ElemArquitectonicoService } from "../../../services/maestros/cultural/elemArquitectonico.js";

const controllerService = new ElemArquitectonicoService();

export class ElemArquitectonicoController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllElemArquitectonico();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_elem_arq } = req.params;
    try {
      const data = await controllerService.getElemArquitectonicoById(
        cod_elem_arq
      );
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_elem_arq, nomb_elem_arq } = req.body;

    try {
      const data = await controllerService.createElemArquitectonico(
        cod_elem_arq,
        nomb_elem_arq
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando el elemento arquitectonico." });
    }
  };

  delete = async (req, res) => {
    const { cod_elem_arq } = req.params;

    try {
      const data = await controllerService.deleteElemArquitectonico(
        cod_elem_arq
      );

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando el elemento arquitectonico." });
    }
  };

  update = async (req, res) => {
    const { cod_elem_arq } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateElemArquitectonico(
        cod_elem_arq,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando el elemento arquitectonico." });
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
