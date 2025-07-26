import express from "express";
import admin from "../config/firebase.js";
import User from "../models/User.js";
import { loginUser } from "../controllers/authControllers.js";


const router = express.Router();

// First-time login route - verifies token, creates user if not exists
router.post("/login",loginUser);

export default router;
