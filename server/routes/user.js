import express from "express"
import { createUser } from "../controller/user"


let user_router = express.Router()


user_router.post("register",createUser)



export {user_router}