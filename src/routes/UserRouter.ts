import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
const userRouter = Router();

userRouter.post("/", (request: Request, response: Response) => {
  return UserController.create(request, response);
});

export { userRouter };
