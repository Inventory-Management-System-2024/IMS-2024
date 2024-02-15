import express from "express";
import {
  createProduct,
  deleteProduct,
  fileUpload,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/product.js";
import multer from "multer";
import path from "path";
import adminAuthenticate from "../utils/middleware/adminAuth.js";

let product_router = express.Router();

const storage = multer.memoryStorage({});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("File type must be jpeg, jpg ,png ");
  },
});

product_router.get("/products", getAllProducts);
product_router.get("/products/:productName", getProduct);
product_router.post("/products", adminAuthenticate, createProduct);
product_router.delete("/products/:id", adminAuthenticate, deleteProduct);
product_router.put("/products/:id", adminAuthenticate, updateProduct);
product_router.post("/products/fileupload", adminAuthenticate, upload.single("file"), fileUpload);

export { product_router };
