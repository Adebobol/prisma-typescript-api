import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser,
} from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoute = Router();

userRoute.use(authMiddleware);

userRoute.post("/address", addAddress);
userRoute.delete("/address/:id", deleteAddress);
userRoute.get("/address", listAddress);
userRoute.put("/", updateUser);
export default userRoute;
