import { Router } from "express";
import { userInfo } from "os";
import authRouter from "./auth";
import productRoute from "./product";
import userRoute from "./user";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/product", productRoute);
rootRouter.use("/user", userRoute);

export default rootRouter;
