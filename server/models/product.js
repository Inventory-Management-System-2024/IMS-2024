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
    },
    image: [
        {
            url: {
                type: String,
                required: [true, "Image is required"],
            },
        },
    ],
    category: {
        type: String,
        required: [true, "enter product category"],
    },
    stock: {
        type: Number,
        required: [true, "please enter product stoke"],
    },
},{ timestamps: true });

export const Product = mongoose.model("product", ProductSchema);
