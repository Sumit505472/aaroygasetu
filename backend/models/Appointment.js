import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  slot: { type: String, required: true }, // e.g., "10:00 AM"
  date: { type: Date, required: true },
});

export default mongoose.model("Appointment", appointmentSchema);
