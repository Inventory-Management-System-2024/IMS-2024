import dbConnect from "../db/index.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/handler.js";

export const getAllData=ErrorHandler(async(req,res)=>{
    try {
        dbConnect();
        const productCount = await Product.find().count()
        const userCount = await User.find().count()
        const orderCount = await Order.find().count()
        const count={
            productCount,userCount,orderCount
        }
        res.status(200).json(count);
    } catch (error) {
        console.error("Error fetching product count:", error);
    }
})