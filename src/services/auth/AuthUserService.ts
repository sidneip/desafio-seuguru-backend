import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { prisma } from "../../database/prismaClient";
class AuthUserService {
  constructor(public email: string, public password: string) {}

  async execute(): Promise<any> {
    const user = await prisma.user.findFirst({
      where: {
        email: this.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const passwordIsValid = await compare(this.password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid password");
    }

    const token = sign(
      { user_id: user.id },
      process.env.APP_SECRET || "secret",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return {
      ...user,
      token,
    };
  }
}

export { AuthUserService };
