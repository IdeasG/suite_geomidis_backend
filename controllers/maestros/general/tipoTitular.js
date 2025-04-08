import "dotenv/config";
import { TipoTitularService } from "../../../services/maestros/general/tipoTitular.js";

const controllerService = new TipoTitularService();

export class TipoTitularController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllTipoTitular();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_tipo_titular } = req.params;
    try {
      const data = await controllerService.getTipoTitularById(cod_tipo_titular);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_tipo_titular, nomb_tipo_titular } = req.body;

    try {
      const data = await controllerService.createTipoTitular(
        cod_tipo_titular,
        nomb_tipo_titular
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando el tipo de Titular" });
    }
  };

  delete = async (req, res) => {
    const { cod_tipo_titular } = req.params;
    try {
      const result = await controllerService.deleteTipoTitular(
        cod_tipo_titular
      );

      if (!result) {
        return res.status(404).json({ message: "Data no eliminada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando la data" });
    }
  };

  update = async (req, res) => {
    const { cod_tipo_titular } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateTipoTitular(
        cod_tipo_titular,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error actualizando la data" });
    }
  };
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
