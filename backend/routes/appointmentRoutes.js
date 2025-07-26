import express from "express";
import Appointment from "../models/Appointment.js";
import {Doctor} from "../models/person.js";

const router = express.Router();

// POST /api/appointments/book
router.post("/book", async (req, res) => {
  try {
    const { doctorId, patientName, patientEmail, slot } = req.body;

    // Optional: check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointment = new Appointment({
      doctorId,
      patientName,
      patientEmail,
      slot,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Appointment error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
