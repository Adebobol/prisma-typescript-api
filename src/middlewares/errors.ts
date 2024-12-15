import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../errors/bad-requests";

export const errorMiddleware = (
  err: BadRequestException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    message: err.message,
    errcode: err.statusCode,
  });
};
