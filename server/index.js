import express from "express";
import env from "dotenv";
import dbConnect from "./db/index.js";
import { user_router } from "./routes/index.js";
import auth from "./utils/middleware/auth.js";

env.config();
const app = express();

app.use(express.json())
app.use(cors());
app.use(login_router)
app.use(user_router)

app.listen(3000, () => {
  console.log("Listening on 3000");
});
