import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    address_line_1: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
    }
});



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name length cannot exceed 30 character"],
        minLength: [4, "name length should be greater than 4"],
    },
    email: {
        type: String,
        required: [true, "please enter Mail id"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minLength: [8, "password must be grater than 8 character"],
    },
    role: {
        type: String,
        default: "user",
    },
    address: {
        type : addressSchema,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
},{ timestamps: true });



export const User = mongoose.model("user", UserSchema);
