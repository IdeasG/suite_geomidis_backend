import { Router } from "express";
import { ExtentController } from "../../controllers/espaciales/extent.js";

export const createRouteExtent = () => {
    const ExtentRouter = Router();

    const extentController = new ExtentController();

    ExtentRouter.post("/all", extentController.getExtentAll);
    ExtentRouter.post("/table", extentController.getExtentTable);

    return ExtentRouter;
};
