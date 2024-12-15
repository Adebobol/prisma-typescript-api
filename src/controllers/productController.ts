import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { object } from "zod";
import { prismaClient } from "..";
import { prisma } from "../config/database";
import { AppError } from "../errors/ApiError";
import { restrictTo } from "../middlewares/authMiddleware";
import { productSchema } from "../schema/product";

export const createProduct = async (req: Request, res: Response) => {
  productSchema.safeParse(req.body);
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.status(200).json({
    product,
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await prisma.product.findFirstOrThrow({
    where: { id: +req.params.id },
  });

  res.status(200).json({
    data: product,
  });
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUpdate = req.body;

  if (Object.keys(newUpdate).length === 0) {
    return next(new AppError("No new updates", 400));
  }

  const { tags, ...data } = newUpdate;
  if (tags && Array.isArray(tags)) {
    newUpdate.tags = newUpdate.tags.join(",");
  }

  const newProduct = await prisma.product.update({
    where: { id: +req.params.id },
    data: newUpdate,
  });

  res.status(200).json({
    status: "Success",
    data: newProduct,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.delete({ where: { id: +req.params.id } });

  res.status(204).json({
    message: "Product deleted",
  });
};

export const listProducts = async (req: Request, res: Response) => {
  const allProducts = await prisma.product.findMany({
    skip: req.query.skip && Number.isNaN(+req.query.skip) ? +req.query.skip : 0,
    // take: 2,
  });

  res.status(200).json({
    message: "Success",
    total: allProducts.length,
    data: allProducts,
  });
};
