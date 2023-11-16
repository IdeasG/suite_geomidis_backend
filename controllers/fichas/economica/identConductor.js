import "dotenv/config";

import { IndentConductorService } from "../../../services/fichas/economica/identConductor.js";

const service = new IndentConductorService();

export class IdentConductorController {
  constructor() {}

  async getIdentConductor(req, res) {
    const { id_ficha } = req.params;
    try {
      const data = await service.getById(id_ficha);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addIdentConductor(req, res) {
    const {
      id_ficha,
      c_nomb_edificacion,
      cod_tipo_edificacion,
      cod_tipo_interior,
      n_num_interior,
      id_hab_urb,
      c_zse_hab_urb,
      c_manzana_hab_urb,
      c_lote_hab_urb,
      c_sublote_hab_urb,
      estpriedad,
    } = req.body;

    try {
      const newTipoVia = await ubicacionPredioService.addIdentConductor(
        id_ficha,
        c_nomb_edificacion,
        cod_tipo_edificacion,
        cod_tipo_interior,
        n_num_interior,
        id_hab_urb,
        c_zse_hab_urb,
        c_manzana_hab_urb,
        c_lote_hab_urb,
        c_sublote_hab_urb,
        estpriedad
      );
      res.status(201).json(newTipoVia);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando ubicación predio: " + error });
    }
  }

  async updateIdentConductor(req, res) {
    const { id_ubicacion } = req.params;
    const {
      id_ficha,
      c_nomb_edificacion,
      cod_tipo_edificacion,
      cod_tipo_interior,
      n_num_interior,
      id_hab_urb,
      c_zse_hab_urb,
      c_manzana_hab_urb,
      c_lote_hab_urb,
      c_sublote_hab_urb,
      estpriedad,
    } = req.body;

    try {
      const newTipoVia = await ubicacionPredioService.updateIdentConductor(
        id_ficha,
        c_nomb_edificacion,
        cod_tipo_edificacion,
        cod_tipo_interior,
        n_num_interior,
        id_hab_urb,
        c_zse_hab_urb,
        c_manzana_hab_urb,
        c_lote_hab_urb,
        c_sublote_hab_urb,
        estpriedad,
        id_ubicacion
      );
      res.status(201).json(newTipoVia);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creando ubicación predio: " + error });
    }
  }
}
