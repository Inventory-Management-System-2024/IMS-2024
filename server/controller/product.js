import dbConnect from "../db/index.js";
import { Product } from "../models/index.js";
import { ErrorHandler } from "../utils/handler.js";
import { cloudinary } from "./../utils/cloudinary.js";

export const getAllProducts = ErrorHandler(async (req, res) => {
  try {
    await dbConnect();
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found " });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    throw new Error(error.toString());
  }
});

export const getProduct = ErrorHandler(async (req, res) => {
  try {
    await dbConnect();

    const productName = req.params.productName;

    // Perform a case-insensitive search for products containing the specified name
    const products = await Product.find({
      productName: { $regex: new RegExp(productName, "i") },
    });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the specified name" });
    }

    res.status(200).json(products);
  } catch (error) {
    throw new Error(error.toString());
  }
});

export const createProduct = ErrorHandler(async (req, res) => {
  try {
    await dbConnect();

    const { productName, description, price, image, stock } = req.body;
    // Validate the required fields
    if (!productName || !description || !price || !image || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const createdProduct = new Product({
      productName,
      description,
      price,
      image,
      stock,
    });

    await createdProduct.save();

    res.status(201).json({ message: "Product created succesfully" });
  } catch (error) {
    throw new Error(error.toString());
  }
});

export const updateProduct = ErrorHandler(async (req, res) => {
  try {
    await dbConnect();
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Updated Sucessfully" });
  } catch (error) {
    throw new Error(error.toString());
  }
});

export const deleteProduct = ErrorHandler(async (req, res) => {
  try {
    await dbConnect();

    const deletedProductId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(deletedProductId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product Deleted Succesfully" });
  } catch (error) {
    throw new Error(error.toString());
  }
});

export const fileUpload = ErrorHandler(async (req, res) => {
  const fileBuffer = req.file.buffer;
  uploadToCloudinary(fileBuffer)
    .then((imageUrl) => {
      res
        .status(200)
        .send({ message: "Image uploaded successfully.", publicurl: imageUrl });
    })
    .catch((error) => {
      throw new Error(error.toString());
    });
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error(error);
          reject("Error uploading image to Cloudinary");
        }

        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};
