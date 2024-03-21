import { forgotPassword,resetPassword } from "../controller/forgot.js"
import { createUser, login } from "../controller/user.js"
import express from "express"

const login_router = express.Router()

login_router.post("/register", createUser)
login_router.post("/login", login)
login_router.patch('/resetPassword/:id',resetPassword)
login_router.post('/forgotPassword',forgotPassword)

export { login_router }