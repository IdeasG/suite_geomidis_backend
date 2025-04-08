import "dotenv/config";
import { FormaAdquiService } from "../../../services/maestros/general/formaAdqui.js";

const controllerService = new FormaAdquiService();
export class FormaAdquiController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllFormaAdqui();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_forma_adqui } = req.params;
    try {
      const data = await controllerService.getFormaAdquiById(cod_forma_adqui);
      if (data) return res.json(data);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_forma_adqui, nomb_forma_adqui } = req.body;
    try {
      const data = await controllerService.createFormaAdqui(
        cod_forma_adqui,
        nomb_forma_adqui
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando la forma de adquisicion." });
    }
  };

  delete = async (req, res) => {
    const { cod_forma_adqui } = req.params;

    try {
      const result = await controllerService.deleteFormaAdqui(cod_forma_adqui);

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }

      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la forma de adquisicion" });
    }
  };

  update = async (req, res) => {
    const { cod_forma_adqui } = req.params;
    const updatedFields = req.body;

    try {
      const updatedFormaAdqui = await controllerService.updateFormaAdqui(
        cod_forma_adqui,
        updatedFields
      );
      return res.json(updatedFormaAdqui);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la forma de adquisicion" });
    }
  };
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
