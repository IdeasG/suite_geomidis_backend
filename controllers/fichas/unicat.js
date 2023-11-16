import { UnicatService } from "../../services/fichas/unicat.js";

const unicatService = new UnicatService();

export class UnicatController {
  constructor() {}

  async getUnicat(req, res) {
    const { id_ficha } = req.query;
    try {
      const data = await unicatService.getUnicat(id_ficha);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUnicatBySearch(req, res) {
    const { search } = req.params;
    try {
      const data = await unicatService.getUnicatBySearch(search);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addUnicat(req, res) {
    const {
      c_cod_cuc,
      c_cod_cuc_2,
      c_ubigeo_dep,
      c_ubigeo_prov,
      c_ubigeo_dist,
      c_cod_sector,
      c_cod_mzna,
      id_lote,
      c_cod_lote,
      c_cod_edifica,
      c_cod_entrada,
      c_cod_piso,
      c_cod_unidad,
      c_cod_dc,
      c_cod_contri_rentas,
      c_cod_predial_rentas,
    } = req.body;

    try {
      const data = await unicatService.addUnicat(
        c_cod_cuc,
        c_cod_cuc_2,
        c_ubigeo_dep,
        c_ubigeo_prov,
        c_ubigeo_dist,
        c_cod_sector,
        c_cod_mzna,
        id_lote,
        c_cod_lote,
        c_cod_edifica,
        c_cod_entrada,
        c_cod_piso,
        c_cod_unidad,
        c_cod_dc,
        c_cod_contri_rentas,
        c_cod_predial_rentas
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creando servicios." });
    }
  }

  async updateUnicat(req, res) {
    const { id_observaciones } = req.params;
    const { id_ficha, c_observaciones } = req.body;

    try {
      const data = await unicatService.updateUnicat(
        id_ficha,
        c_observaciones,
        id_observaciones
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando servicio: " + error });
    }
  }
}
