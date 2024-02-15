import jwt from 'jsonwebtoken';
import env from "dotenv"
env.config()


const adminAuthenticate = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Missing authentication token" });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid authentication token" });
            }
            const { role } = decoded;
            if (!role) {
                return res.status(403).json({ message: "Role not found in token" });
            }
            if (role !== 'admin') {
                return res.status(403).json({ message: "Not admin role" });
            }
            Object.assign(req, { user: decoded })
            next();
        });
    }
    catch (err) {
        throw new Error(err.toString());
    }
};

export default adminAuthenticate;
