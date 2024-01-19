import express from 'express';
import jwt from 'jsonwebtoken';


const app = express();


const secretKey = "your-secret-key";

const dummyToken = jwt.sign({ id: 1, username: "user" }, secretKey);
   
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    next();
  });
};

// app.get("/", (req, res) => {
//   res.send("Hello, World! (No authentication required)");
// });

app.get("/secure", authenticate, (req, res) => {
  res.send("You have access to this secure route!");
});

app.get("/getDummyToken", (req, res) => {
  res.json({ token: dummyToken });
});

export default authenticate;

