import mongoose,{Schema, Model} from "mongoose"
const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],
    orderStatus:{
        type:String,
        required:true,
        default:"Processing",
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true,
    },
    paidAt:{
        type:Date,
        required:true,
    }
    
})
const Order = mongoose.model("Order",OrderSchema); 
export {Order}
