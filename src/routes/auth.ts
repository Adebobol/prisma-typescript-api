import { Router } from "express";
import { login, me, signUp } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import { errorHandler } from "../errors/error-handler";

const authRouter = Router();

authRouter.get("/login", login);
authRouter.post("/signUp", signUp);
authRouter.get("/me", authMiddleware, errorHandler(me));

export default authRouter;
