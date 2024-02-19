import express from "express"
import { getAllData } from "../controller/dashboard.js";
const getDash_router = express.Router()

getDash_router.get("/dashboard",getAllData);



export { getDash_router }