import "dotenv/config";
import { EcsService } from "../../../services/maestros/general/ecs.js";

const controllerService = new EcsService();
export class EcsController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllEcs();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_ecs } = req.params;
    try {
      const data = await controllerService.getEcsById(cod_ecs);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_ecs, nomb_ecs } = req.body;

    try {
      const data = await controllerService.createEcs(cod_ecs, nomb_ecs);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el ECS" });
    }
  };

  delete = async (req, res) => {
    const { cod_ecs } = req.params;

    try {
      const data = await controllerService.deleteEcs(cod_ecs);

      if (!data) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando el ECS" });
    }
  };

  update = async (req, res) => {
    const { cod_ecs } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateEcs(cod_ecs, updatedFields);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el ECS" });
    }
  };
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
