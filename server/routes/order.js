import express from "express"
import { createOrder, getOrder, updateOrder, deleteOrder, getOrders } from "../controller/order.js"
import authenticate from "../utils/middleware/auth.js"
import adminAuthenticate from "../utils/middleware/adminAuth.js"

const order_router = express.Router()

order_router.get("/order", adminAuthenticate, getOrders)
order_router.post("/order", authenticate, createOrder)
order_router.get("/order/:id", authenticate, getOrder)
order_router.put("/order/:id", adminAuthenticate, updateOrder)
order_router.delete("/order/:id", adminAuthenticate, deleteOrder)

export { order_router }


