import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/product.js";
import authenticate from "../utils/middleware/auth.js";

let product_router = express.Router();

product_router.use(authenticate);

product_router.get("/products", getAllProducts);
product_router.get("/products/:productName", getProduct);
product_router.post("/products", createProduct);
product_router.delete("/products/:id", deleteProduct);
product_router.put("/products/:id", updateProduct);

export { product_router };
