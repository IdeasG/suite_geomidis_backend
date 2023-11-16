import "dotenv/config";

import { UbicacionPredioService } from "../../../services/fichas/individual/ubicacionPredio.js";

import { redisClient } from "../../../config/redis/redis.js";

const ubicacionPredioService = new UbicacionPredioService();

export class UbicacionPredioController {
  constructor() {}

  async getAllMaestros(req, res) {
    try {
      const cacheKey = req.originalUrl;
      // const deletedKeysCount = await redisClient.del(cacheKey);
      const cachedResponse = await redisClient.get(cacheKey);
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }
      const maestrosUbiPredio = await ubicacionPredioService.getAllMaestro();
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(
        cacheKey,
        cacheExpiry,
        JSON.stringify(maestrosUbiPredio)
      );
      res.json(maestrosUbiPredio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUbiPredio(req, res) {
    const { id_ficha } = req.query;
    try {
      const ubiPredio = await ubicacionPredioService.getUbiPredio(id_ficha);
      res.json(ubiPredio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addVias(req, res) {
    const {
      id_ficha,
      id_via,
      id_cuadra,
      cod_tipo_puerta,
      n_num_muni,
      cod_cond_num,
      n_nro_cert_num,
    } = req.body;

    try {
      const newTipoVia = await ubicacionPredioService.addVias(
        id_ficha,
        id_via,
        id_cuadra,
        cod_tipo_puerta,
        n_num_muni,
        cod_cond_num,
        n_nro_cert_num
      );
      res.status(201).json(newTipoVia);
    } catch (error) {
      res.status(500).json({ error: "Error creando vía" });
    }
  }

  async deleteVias(req, res) {
    const { id_ubicacion_via_cuadra } = req.params;

    try {
      const newTipoVia = await ubicacionPredioService.deleteUbiVias(
        id_ubicacion_via_cuadra
      );
      res.status(201).json(newTipoVia);
    } catch (error) {
      res.status(500).json({ error: "Error creando vía" });
    }
  }

  async addUbicacionPredio(req, res) {
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
      const newTipoVia = await ubicacionPredioService.addUbicacionPredio(
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

  async updateUbicacionPredio(req, res) {
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
      const newTipoVia = await ubicacionPredioService.updateUbicacionPredio(
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
