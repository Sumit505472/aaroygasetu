import express from "express";
import { uploadRecord,getRecordsForUser } from "../controllers/medicalRecordControllers.js";
import { verifyToken } from "../middlewares/verifytokens.js";
const router = express.Router();
router.post("/upload", verifyToken, uploadRecord);
router.get("/:userId", verifyToken, getRecordsForUser);
export default router;
