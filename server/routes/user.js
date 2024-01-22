import express from "express"
import { createUser, getUser, updateUser, deleteUser, getAllUser } from "../controller/user.js"


let user_router = express.Router()


user_router.post("/register",createUser)
user_router.get("/user/:id",getUser)
user_router.put("/user/:id",updateUser)
user_router.delete("/user/:id",deleteUser)
user_router.get("/users",getAllUser)


export {user_router}