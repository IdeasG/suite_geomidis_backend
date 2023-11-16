import { SmlService } from "../../services/espaciales/sml.js";

const smlService = new SmlService();

export class SmlController {
  constructor() {}

  async getSector(req, res) {
    try {
      const data = await smlService.getSector();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getManzana(req, res) {
    const { id_sector } = req.params;
    try {
      const data = await smlService.getManzana(id_sector);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getLote(req, res) {
    const { id_manzana } = req.params;
    try {
      const data = await smlService.getLote(id_manzana);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
