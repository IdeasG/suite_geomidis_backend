import { Router } from 'express';
import { CapasController } from '../../controllers/espaciales/capas.js';

import { cacheMiddleware } from '../../middlewares/redis.js';

export const createRouteCapas = () => {
    const CapaRouter = Router();

    const capasController = new CapasController();

    CapaRouter.get('/', cacheMiddleware,  capasController.getAll);
    CapaRouter.get('/estructura', cacheMiddleware,  capasController.getStructure);
    CapaRouter.get('/visible/:id_capa',  capasController.getVisibles)
    CapaRouter.put('/actualizar/visible',  capasController.putVisibles)
    CapaRouter.post("/excel", capasController.descargarExcel)

    return CapaRouter;
};
