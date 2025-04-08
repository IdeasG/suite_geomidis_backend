import { Router } from 'express';
import { PruebasController } from '../../controllers/pruebas/pruebas.js';

export const createRoutePuatpias = () => {
    const PruebasRouter = Router();

    const pruebasController = new PruebasController();

    PruebasRouter.get('/',  pruebasController.getAll);

    return PruebasRouter;
};
