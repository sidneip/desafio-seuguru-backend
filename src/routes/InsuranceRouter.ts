import { Router, Request, Response } from "express";
import { InsuranceController } from "../controllers/InsuranceController";

const insuranceRouter = Router();

insuranceRouter.post("/", async (request: Request, response: Response) => {
  return await InsuranceController.create(request, response);
});

insuranceRouter.get("/", async (request: Request, response: Response) => {
  return await InsuranceController.index(request, response);
});

insuranceRouter.get("/:id", async (request: Request, response: Response) => {
  return await InsuranceController.show(request, response);
});
export { insuranceRouter };
