


import 'dotenv/config'

import { validatePagination } from '../../schemas/generales/pagination.js'

import { CapasService } from '../../services/espaciales/capas.js';

import { redisClient } from '../../config/redis/redis.js';

const tipoViaService = new CapasService();

export class PruebasController {
  constructor() { 
  }

  async getAll(req, res) {
    const result = validatePagination(req.query); 
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }  
    try {
      const data = [
          {
              "NPATCA":"",
              "NUMUSU":0,
              "NUMATE":0,
              "UBIGEO":"1",
              "COCEPO":"1",
              "CUENCA":"",
              "NOMEMB":"",
              "ANOCAM":0,
              "TIPPLA":"1",
              "FEMODIF": "",
              "FECREA": "",
              "FELIMIN": "",
              "COUBIX":-75, // CAMPO OBLIGATORIO COORDENADA X
              "COUBIY":-3  // CAMPO OBLIGATORIO COORDENADA Y
          },
          {
              "NPATCA":"",
              "NUMUSU":0,
              "NUMATE":0,
              "UBIGEO":"1",
              "COCEPO":"1",
              "CUENCA":"",
              "NOMEMB":"",
              "ANOCAM":0,
              "TIPPLA":"1",
              "FEMODIF": "",
              "FECREA": "",
              "FELIMIN": "",
              "COUBIX":-71, // CAMPO OBLIGATORIO COORDENADA X
              "COUBIY":-3  // CAMPO OBLIGATORIO COORDENADA Y
          }
      ]
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
