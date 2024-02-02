import dbConnect, { closeDb } from "../db/index.js"
import { ErrorHandler } from "../utils/handler.js"
import { Order } from "../models/index.js"



export const createOrder = ErrorHandler(async (req, res) => {
    try {

        Object.assign(req.body, { user: req.user.user_id })
        await dbConnect()
        let order = await (await new Order(req.body).save()).populate(["user ", "orderItems.product"])


        res.status(200).json(order)
    } catch (e) {
        throw new Error(e.toString())
    }
})



export const getOrder = ErrorHandler(async (req, res) => {
    try {
        let order_id = req.params.id
        await dbConnect()
        let order = await Order.findById(order_id)
        res.status(200).json(order)
    } catch (e) {
        throw new Error(e.toString())
    }
})



export const updateOrder = ErrorHandler(async (req, res) => {
    try {
        let id = req.params.id
        let update = req.body
        await dbConnect()
        let updated = await Order.findByIdAndUpdate(id, update).populate(["user ", "orderItems.product"])
        if (updated) {
            res.status(200).json({ meassage: `Succesfully updated order with id ${id}` })
        } else {
            res.status(200).json({ meassage: `No order found with id ${id}` })
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})



export const getOrders = ErrorHandler(async (req, res) => {
    try {
        await dbConnect()
        let orders = await Order.find({}).populate("user").populate("orderItems.product")

        res.status(200).json(orders)
    } catch (e) {
        throw new Error(e.toString())
    }
})



export const deleteOrder = ErrorHandler(async (req, res) => {
    try {
        await dbConnect()
        let id = req.params.id
        let deleted = await Order.findByIdAndDelete(id)
        if (deleted) {
            res.status(200).json({ meassage: `Succesfully deleted order with id ${id}` })
        } else {
            res.status(200).json({ meassage: `No order found with id ${id}` })
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})


