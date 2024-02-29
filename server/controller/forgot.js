import dbConnect from "../db/index.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/handler.js";
import nodemailer from 'nodemailer'

export const forgotPassword=ErrorHandler(async(req,res)=>{
    try {
        dbConnect();
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: "User does not exists" }));
        } else {
            const link=`http://localhost:4200/resetPassword/${user.id}`;
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                  user: 'jaykshah2002@gmail.com',
                  pass: 'jaif gmko pcwb bodb'
                }
              });
              let mailOptions = {
                from: 'jaykshah2002@gmail.com',
                to: req.body.email,
                subject: 'Reset Password in E-StockMaster',
                html:`<!DOCTYPE html><body>You may reset your Reset using below link:
                ${link}</body>
                </html>
            `}
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }})
            res.status(200).json({message:"Reset link sent to email address"})
        }
    } catch (error) {
        console.error("Error fetching product count:", error);
    }
})

export const resetPassword=ErrorHandler(async(req,res)=>{
    try {
        dbConnect();
        const {id}=req.params;
        const user=await User.findByIdAndUpdate(id,
            req.body,
            {
              new: true,
              runValidators: true,
            })
        if(user){
            res.status(200).send(user);
        }
    } catch (error) {
        console.error("Error fetching product count:", error);
    }
})
