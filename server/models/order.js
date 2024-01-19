import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    orderItems: [
        {
            
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                required: true,

            },
            
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "product id is required"],
            },
        },
    ],
    orderStatus: {
        type: String,
        required: [true, "OrderStatus is required"],
        default: "Processing",
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: [true, "total price is required"],
    },
    paidAt: {
        type: Date,
        required: [true, "paid At is required"],
    },
},{ timestamps: true });
export const Order = mongoose.model("Order", OrderSchema);
