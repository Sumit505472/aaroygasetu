import express from "express";
import { Doctor, Patient } from "../models/person.js"; // assuming your models are in User.js

const router = express.Router();

// ✅ POST /api/profile/doctor - Create or update doctor profile
router.post("/doctor", async (req, res) => {
  const { uid, name, specialization, qualifications, hospital, contactNumber, availableSlots } = req.body;

  try {
    const doctor = await Doctor.findOneAndUpdate(
      { uid },
      { name, specialization, qualifications, hospital, contactNumber, availableSlots },
      { upsert: true, new: true }
    );
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to save doctor profile" });
  }
});

// ✅ POST /api/profile/patient - Create or update patient profile
router.post("/patient", async (req, res) => {
  const { uid, name, age, gender, doctorId, contactNumber, address } = req.body;

  try {
    const patient = await Patient.findOneAndUpdate(
      { uid },
      { name, age, gender, doctorId, contactNumber, address },
      { upsert: true, new: true }
    );
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to save patient profile" });
  }
});

export default router;
