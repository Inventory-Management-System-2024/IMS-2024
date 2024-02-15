import { User } from "../models/index.js";
import dbConnect from "../db/index.js";
import { ErrorHandler } from "../utils/index.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export const createUser = ErrorHandler(async (req, res) => {
    try {
        await dbConnect();
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: "User already exists" }));
        } else {
            let doc = new User(req.body);
            await doc.save();
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: "Succesfully added user" }));
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})

export const getUser = ErrorHandler(async (req, res) => {
    try {
        let id = req.params.id
        await dbConnect()
        let user = await User.findById(id)
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "User does not exist" }));
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})

export const updateUser = ErrorHandler(async (req, res) => {
    try {
        let id = req.params.id
        await dbConnect()

        let user = await User.findByIdAndUpdate(id, req.body)
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "User updated successfully." }));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "User does not exist" }));
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})

export const deleteUser = ErrorHandler(async (req, res) => {
    try {
        let id = req.params.id
        await dbConnect()

        let user = await User.findByIdAndDelete(id)
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "User deleted successfully." }));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "User does not exist" }));
        }
    } catch (e) {
        throw new Error("Error updating user.")
    }
})

export const getAllUser = ErrorHandler(async (req, res) => {
    try {

        await dbConnect()
        let users = await User.find({})

        if (users) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(users))
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "Users does not exist" }))
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})


export const login = ErrorHandler(async (req, res) => {
    try {
        await dbConnect();
        let user = await User.findOne({ email: req.body.email });
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (user && isPasswordMatch) {
            let token = jwt.sign({
                user_id: user._id,
                email: user.email,
                role: user.role,
            }, process.env.SECRET_KEY)
            res.header('Authorization', 'Bearer ' + token);
            const x = {
                token: token,
                user: user
            }
            res.json(x)
            }
        else {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: "Invalid credentials." }));
        }
    } catch (e) {
        throw new Error(e.toString())
    }
})
