import express from "express"
import { getUser, updateUser, deleteUser, getAllUser } from "../controller/user.js"
import adminAuthenticate from "../utils/middleware/adminAuth.js"
import userAuthenticate from "../utils/middleware/userAuth.js"

let user_router = express.Router()

user_router.get("/user/:id", userAuthenticate, getUser)
user_router.put("/user/:id", userAuthenticate, updateUser)
user_router.delete("/user/:id", adminAuthenticate, deleteUser)
user_router.get("/users", adminAuthenticate, getAllUser)

export { user_router }