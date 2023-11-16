import 'dotenv/config'

import { validatePagination } from '../../schemas/generales/pagination.js'

import { CapasService } from '../../services/espaciales/capas.js';

import { redisClient } from '../../config/redis/redis.js';

import { sequelize } from '../../config/postgres/sequelize.js';
import { response } from 'express';

const capasService = new CapasService();

export class CapasController {
  constructor() { 
  }

  async getAll(req, res) {
    const result = validatePagination(req.query); 
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }  
    const { page = 1, pageSize = 5 } = result.data;  
    try {
      const cacheKey = req.originalUrl;
      const cachedResponse = await redisClient.get(cacheKey);  
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }
      const tipoVias = await capasService.getAllCapas(page, pageSize);
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(tipoVias));
  
      res.json(tipoVias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getStructure (req, res) {
    try {
      // redis cache
      const cacheKey = req.originalUrl;
      const cachedResponse = await redisClient.get(cacheKey);  
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.json(parsedResponse);
      }

      const [superGrupos, metadata] = await sequelize.query(`select * from administracion.tadm_capas_supergrupo`);
      const dbResponse = superGrupos;
      for (let index = 0; index < superGrupos.length; index++) {
          const element = superGrupos[index];
          const [grupos, metadata] = await sequelize.query(`select * from administracion.tadm_capas_grupo WHERE id_super_grupo = ${element.id_super_grupo}`);
          for (let index = 0; index < grupos.length; index++) {
              const element = grupos[index];
              const [capas, metadata] = await sequelize.query(`select * from administracion.tadm_capas WHERE id_grupo = ${element.id_grupo}`);
              element.capas = capas;
          }    
          element.grupos = grupos;
      }
      // redis cache
      const cacheExpiry = process.env.REDIS_TIME_CACHE;
      await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(dbResponse));
      res.status(200).json({status: 'success', data: dbResponse});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVisibles (req, res) {
    const {id_capa} = req.params;
    try {
      let dbResponse = await capasService.getCapasVisibles(id_capa);
      if (dbResponse.length == 0) {
        const responseCreate = await capasService.postCapasVisibles(id_capa);
        // console.log(responseCreate);
        dbResponse = responseCreate
      }
      res.status(200).json({status: 'success', data: dbResponse});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async putVisibles (req, res) {
    console.log('hola');
    const {id,c_campo_alias,b_campo} = req.body;
    console.log(id,c_campo_alias,b_campo);
    try {
      await capasService.putCapasVisibles(id,c_campo_alias,b_campo);
      res.status(200).json({status: 'success'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}