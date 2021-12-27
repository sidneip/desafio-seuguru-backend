import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
class UserController {
  static async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const user = await new CreateUserService({
      name,
      email,
      password,
    }).execute();
    return response.json(user);
  }
}

export { UserController };
