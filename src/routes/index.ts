import { Router } from "express";
import authRouter from "./auth";
import productRoute from "./product";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/product", productRoute);

export default rootRouter;
