import "dotenv/config";

import { ServicioPredioService } from "../../../services/fichas/individual/serviciosPredio.js";

const servicioPredioService = new ServicioPredioService();

export class ServicioPredioController {
  constructor() {}

  async getServicios(req, res) {
    const { id_ficha } = req.query;
    try {
      const servicioPredio = await servicioPredioService.getServicios(id_ficha);
      res.json(servicioPredio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addServicios(req, res) {
    const {
      id_ficha,
      c_agua,
      c_luz,
      c_telefono,
      c_desague,
      c_gas,
      nro_cont_agua,
      nro_sum_luz,
      nro_sum_telefono,
      nro_sum_gas,
      c_internet,
      c_cable,
    } = req.body;

    try {
      const newServicio = await servicioPredioService.addServicios(
        id_ficha,
        c_agua == "true" || c_agua == true ? "SI" : "NO",
        c_luz == "true" || c_luz == true ? "SI" : "NO",
        c_telefono == "true" || c_telefono == true ? "SI" : "NO",
        c_desague == "true" || c_desague == true ? "SI" : "NO",
        c_gas == "true" || c_gas == true ? "SI" : "NO",
        nro_cont_agua,
        nro_sum_luz,
        nro_sum_telefono,
        nro_sum_gas,
        c_internet == "true" || c_internet == true ? "SI" : "NO",
        c_cable == "true" || c_cable == true ? "SI" : "NO"
      );
      res.status(201).json(newServicio);
    } catch (error) {
      res.status(500).json({ error: "Error creando servicios." });
    }
  }

  async updateServicios(req, res) {
    const { id_servicio } = req.params;
    const {
      id_ficha,
      c_agua,
      c_luz,
      c_telefono,
      c_desague,
      c_gas,
      nro_cont_agua,
      nro_sum_luz,
      nro_sum_telefono,
      nro_sum_gas,
      c_internet,
      c_cable,
    } = req.body;

    try {
      const updateServicio = await servicioPredioService.updateServicios(
        id_ficha,
        c_agua == "true" || c_agua == true ? "SI" : "NO",
        c_luz == "true" || c_luz == true ? "SI" : "NO",
        c_telefono == "true" || c_telefono == true ? "SI" : "NO",
        c_desague == "true" || c_desague == true ? "SI" : "NO",
        c_gas == "true" || c_gas == true ? "SI" : "NO",
        nro_cont_agua,
        nro_sum_luz,
        nro_sum_telefono,
        nro_sum_gas,
        c_internet == "true" || c_internet == true ? "SI" : "NO",
        c_cable == "true" || c_cable == true ? "SI" : "NO",
        id_servicio
      );
      res.status(201).json(updateServicio);
    } catch (error) {
      res.status(500).json({ error: "Error actualizando servicio: " + error });
    }
  }

  async deleteServicios(req, res) {
    const { id_servicio } = req.params;

    try {
      const deleteServicio = await servicioPredioService.deleteServicios(
        id_servicio
      );
      res.status(201).json(deleteServicio);
    } catch (error) {
      res.status(500).json({ error: "Error eliminando servicio" });
    }
  }
}
