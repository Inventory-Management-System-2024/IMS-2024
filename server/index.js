import express from "express";
import env from "dotenv";
import dbConnect from "./db/index.js";

env.config();
const app = express();

dbConnect();

app.listen(3000, () => {
  console.log("Listening on 3000");
});
