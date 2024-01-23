import express from "express"
import {createOrder, getOrder, updateOrder, deleteOrder, getOrders} from "../controller/order.js"
import authenticate from "../utils/middleware/auth.js"


const order_router = express.Router()


order_router.use(authenticate)


order_router.get("/orders",getOrders)
order_router.post("/order", createOrder)
order_router.get("/order/:id", getOrder)
order_router.put("/order/:id", updateOrder)
order_router.delete("/order/:id", deleteOrder)

export {order_router}


