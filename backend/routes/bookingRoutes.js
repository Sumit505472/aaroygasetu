import express from "express";
import BookingSchema from "../models/bookingSchema.js";

const router=express.Router();
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const bookings = await Booking.find({ doctorId: req.params.doctorId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;



