import { prisma } from "../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: ICreateUser) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async execute(): Promise<any> {
    const hashedPassword = await hash(this.password, 8);
    const user = await prisma.user.create({
      data: {
        name: this.name,
        email: this.email,
        password: hashedPassword,
      },
    });
    console.log(user);
    return user;
  }
}

export { CreateUserService };
