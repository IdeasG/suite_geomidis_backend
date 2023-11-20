import { MapaBaseService } from "../../services/espaciales/mapa_base.js";

const mapasBaseService = new MapaBaseService();

export class MapaBaseController {
  constructor() {}

  async getMapaBase(req, res) {
    try {
      const data = await mapasBaseService.getMapaBase();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async postMapaBase(req, res) {
    const { c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key } = req.body;
    try {
      const data = await mapasBaseService.postMapaBase(c_nomb_mapa, c_key, c_imagery_set, c_url, c_img, b_key);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
