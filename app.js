import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";

import route from "./routes/route.js";

import { connectDB } from "./db/connect.js";
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors("htts://Sign-backend.onrender.com"));

app.use("/users", route); // http://localhost:5000/users/signup

const port = process.env.PORT || 5000;

const lunchApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(process.env.MernUrl);
    app.listen(port, console.log(`App is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

lunchApp();
