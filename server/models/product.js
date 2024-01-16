import { Schema, Model } from "mongoose";

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
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
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
});

export const Product = mongoose.Model("product", ProductSchema);
