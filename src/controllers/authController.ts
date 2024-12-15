import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../errors/bad-requests";
import { UnprocessableEntity } from "../errors/validation";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new BadRequestException("Enter email or password", 400));
    }
    let user = await prismaClient.user.findFirst({ where: { email: email } });

    if (!user) return next(new BadRequestException("user does not exist", 400));

    if (!compareSync(password, user.password))
      throw Error("Password not correct");

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      user,
      token,
    });
  } catch {
    next(new UnprocessableEntity("Unprocessable entity", 404));
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email: email } });
  if (user) {
    throw Error("User exists...");
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

// me

export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};
