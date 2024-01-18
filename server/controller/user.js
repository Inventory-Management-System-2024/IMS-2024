import { User } from "../models/index.js";
import dbConnect from "../db/index.js";
import { ErrorHandler } from "../utils/index.js";



export const createUser = ErrorHandler(async (req, res) => {
    try {
        await dbConnect();
        let user = await User.findOne({ email: req.body.user.email });
        if (user) {
            res.send("User already exists");
        } else {
            let doc = new User(req.body.user);
            await doc.save();
            res.send("Succesfully added user");
        }
    } catch (e) {
        throw new Error("Error in creating new user");
    }
})

export async function getUser() {}

export async function updateUser() {}

export async function deleteUser() {}

export async function getAllUser() {}

export async function register() {}
