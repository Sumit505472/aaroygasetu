import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import { verifyToken } from "./middlewares/verifytokens.js";
import connectDB from "./database/db.js";
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
connectDB();

// Routes

app.get("/",(req,res)=>{
    res.send("aarogya setu is coming soon");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
