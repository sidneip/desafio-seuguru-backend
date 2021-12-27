import { Request, Response } from "express";
import { AuthUserService } from "../services/auth/AuthUserService";

class AuthController {
  static async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const res = await new AuthUserService(email, password).execute();
    return response.status(200).json(res);
  }
}

export { AuthController };
