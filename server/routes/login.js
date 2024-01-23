import { createUser, login } from "../controller/user.js"
import express from "express"

const login_router = express.Router()

login_router.post("/register", createUser)
login_router.post("/login", login)


export {login_router}