import { Router, Request, Response } from "express";
import { SimulatorController } from "../controllers/SimulatorController";
const simulatorRouter = Router();

simulatorRouter.post(
  "/:insurance_id",
  (request: Request, response: Response) => {
    return SimulatorController.create(request, response);
  }
);

export { simulatorRouter };
