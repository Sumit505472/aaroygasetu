import express from "express";
import { verifyToken } from "../middlewares/verifytokens.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/doctor/dashboard", verifyToken, checkRole(["doctor"]), (req, res) => {
  res.json({ message: "Welcome Doctor!" });
});

router.get("/patient/dashboard", verifyToken, checkRole(["patient"]), (req, res) => {
  res.json({ message: "Welcome Patient!" });
});

export default router;
