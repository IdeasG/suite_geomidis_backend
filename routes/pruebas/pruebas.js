import { Router } from 'express';
import { PruebasController } from '../../controllers/pruebas/pruebas.js';

import { cacheMiddleware } from '../../middlewares/redis.js';

export const createRoutePuatpias = () => {
    const PruebasRouter = Router();

    const pruebasController = new PruebasController();

    PruebasRouter.get('/', cacheMiddleware,  pruebasController.getAll);

    return PruebasRouter;
};
