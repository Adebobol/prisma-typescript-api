import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { prisma } from "../config/database";
import { AppError } from "../errors/ApiError";
import { addressSchema } from "../schema/address";
import { productSchema } from "../schema/product";

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  addressSchema.parse(req.body);

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });

  res.status(201).json({
    data: address,
  });
};

export const deleteAddress = async (req: Request, res: Response) => {
  await prisma.address.delete({
    where: { id: +req.params.id },
  });

  res.status(200).json({
    message: "Success",
  });
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany({
    where: { userId: req.user.id },
  });

  res.status(200).json({
    data: addAddress,
  });
};
