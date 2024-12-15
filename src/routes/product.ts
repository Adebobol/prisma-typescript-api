import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController";
import { errorHandler } from "../errors/error-handler";
import { authMiddleware, restrictTo } from "../middlewares/authMiddleware";

const productRoute = Router();

productRoute.use(authMiddleware);

productRoute.post("/", restrictTo("ADMIN"), errorHandler(createProduct));
productRoute.put("/:id", restrictTo("ADMIN"), errorHandler(updateProduct));
productRoute.delete(
  "/:id",
  restrictTo("ADMIN", "USER"),
  errorHandler(deleteProduct)
);
productRoute.get("/:id", restrictTo("ADMIN", "USER"), errorHandler(getProduct));
productRoute.get("/", restrictTo("ADMIN", "USER"), errorHandler(listProducts));

export default productRoute;
