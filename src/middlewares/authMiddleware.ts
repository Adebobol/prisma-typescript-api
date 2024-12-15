import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/ApiError";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    return next(new AppError("Unauthorized", 404));
  }
  const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

  const user = await prismaClient.user.findFirst({ where: { id: payload.id } });

  if (!user) {
    return next(new AppError("Unauthorized", 401));
  }

  req.user = user;
  next();
};

export default authMiddleware;
