import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "User is required"],
    },
    orderItems: [
        {

            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: [1, "Quantity must be at least 1"],
            },

            product: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: [true, "product id is required"],
            },
        },
    ],
    orderStatus: {
        type: String,
        required: [true, "OrderStatus is required"],
        default: "Processing",
        enum: ['Processing', 'Completed','Canceled']
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: [true, "total price is required"],
        min: [0, "Total price must be non-negative"],
    },
    paidAt: {
        type: Date,
        default: null,
        required: [true, "paid At is required"],
        default: Date.now,
        validate: {
            validator: function (value) {
                return value === null || value <= new Date();
            },
            message: "PaidAt must be in the past or present",
        },
    },
}, { timestamps: true });
export const Order = mongoose.model("Order", OrderSchema);
