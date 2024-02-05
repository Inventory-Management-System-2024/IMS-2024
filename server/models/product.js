import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "please enter description"],
    },
    price: {
        type: Number,
        required: [true, "please enter product price"],
        min: [0, "Price must be a positive number"],
    },
    image: [
        {
            url: {
                type: String,
                required: [true, "Image is required"],
            },
        },
    ],
    stock: {
        type: Number,
        required: [true, "please enter product stoke"],
        min: [0, "stock must be a non-negative number"],
        validate: {
            validator: Number.isInteger,
            message: "Stock must be an integer.",
        },
    },
},{ timestamps: true });

export const Product = mongoose.model("product", ProductSchema);
