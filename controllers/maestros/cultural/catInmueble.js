import "dotenv/config";
import { CatInmuebleService } from "../../../services/maestros/cultural/catInmueble.js";

const controllerService = new CatInmuebleService();
export class CatInmuebleController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await controllerService.getAllCatInmueble();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    const { cod_cat_inmueble } = req.params;
    try {
      const data = await controllerService.getCatInmuebleById(cod_cat_inmueble);
      if (data) return res.json(tipoVia);
      res.status(404).json({ message: "Data no encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const { cod_cat_inmueble, nomb_cat_inmueble } = req.body;

    try {
      const data = await controllerService.createCatInmueble(
        cod_cat_inmueble,
        nomb_cat_inmueble
      );
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando la categoria del inmueble." });
    }
  };

  delete = async (req, res) => {
    const { cod_cat_inmueble } = req.params;

    try {
      const result = await controllerService.deleteCatInmueble(
        cod_cat_inmueble
      );

      if (!result) {
        return res.status(404).json({ message: "Data no encontrada" });
      }
      return res.json({ message: "Data eliminada" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error eliminando la categoria del inmueble" });
    }
  };

  update = async (req, res) => {
    const { cod_cat_inmueble } = req.params;
    const updatedFields = req.body;

    try {
      const data = await controllerService.updateCatInmueble(
        cod_cat_inmueble,
        updatedFields
      );
      return res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error actualizando la categoria del inmueble" });
    }
  };
  async clearCache(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
