import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            
            quantity: {
                type: Number,
                required: true,
            },
            
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    paidAt: {
        type: Date,
        required: true,
    },
},{ timestamps: true });
export const Order = mongoose.model("Order", OrderSchema);
