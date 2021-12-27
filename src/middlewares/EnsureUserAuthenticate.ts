import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const ensureUserAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const parts = authHeader.split(" ");

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: "Token malformatted" });
  }

  try {
    const { sub } = verify(token, process.env.SECRET_KEY || "secret") as {
      sub: string;
    };

    request.user_id = sub;
  } catch (err) {
    return response.status(401).json({ message: "Token invalid" });
  }

  return next();
};
