import { Address } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { prisma } from "../config/database";
import { AppError } from "../errors/ApiError";
import { addressSchema } from "../schema/address";
import { productSchema } from "../schema/product";
import { updateUserSchema } from "../schema/user";

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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = updateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;

  if (
    !validatedData.defaultShippingAddress &&
    !validatedData.defaultBillingAddress
  ) {
    return next(new AppError("billing amd shipping address empty", 400));
  }

  shippingAddress = await prisma.address.findFirstOrThrow({
    where: { id: validatedData.defaultShippingAddress ?? 0 },
  });

  billingAddress = await prisma.address.findFirstOrThrow({
    where: { id: validatedData.defaultShippingAddress ?? 0 },
  });

  if (!shippingAddress && !billingAddress) {
    return next(new AppError("not address matches this billing id ", 400));
  }

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: validatedData,
  });

  res.status(200).json({
    updatedUser,
  });
};
