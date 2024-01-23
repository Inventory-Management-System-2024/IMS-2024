import express from 'express';
import jwt from 'jsonwebtoken';
import env from "dotenv"
env.config()


   
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    next();
  });
};


export default authenticate;

