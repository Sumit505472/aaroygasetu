import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middlewares/verifytokens.js"
import connectDB from "./database/db.js";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import medicalRoutes from "./routes/medicalRoutes.js";
import personRoutes from "./routes/profile.js";
import doctorRoutes from "./routes/doctor.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("api/appointments", appointmentRoutes);
app.use("api/records", medicalRoutes);
app.use("/api/booking", bookingRoutes);

app.use("/api/doctor",doctorRoutes);//sabhi doctor ka page 

app.get("/",(req,res)=>{
    res.send("aarogya setu is coming soon");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
