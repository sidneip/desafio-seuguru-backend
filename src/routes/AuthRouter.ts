import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/", (request: Request, response: Response) => {
  return AuthController.create(request, response);
});

export { authRouter };
