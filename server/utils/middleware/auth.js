import express from 'express';
import jwt from 'jsonwebtoken';
import env from "dotenv"
env.config()


const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Missing authentication token" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid authentication token" });
      }
      Object.assign(req, { user: decoded })
      next();
    });
  }
  catch (err) {
    throw new Error(err.toString());
  }
};

export default authenticate;
