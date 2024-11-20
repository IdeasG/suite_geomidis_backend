import { Router } from "express";
import { ServiciosController } from "../../controllers/espaciales/servicios.js";

export const createRouteServicios = () => {
    const ServiciosRouter = Router();

    const serviciosController = new ServiciosController();

    ServiciosRouter.get("/buscar/:tipo/:search", serviciosController.buscarServicios);

    return ServiciosRouter;
};
