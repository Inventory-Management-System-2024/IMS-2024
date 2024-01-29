import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const IsAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }

  jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid authentication token" });
    }
    req.user = decoded;
    next();
  });
};


export default authenticate;
