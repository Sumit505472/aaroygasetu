import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: String,
  patientEmail: String,
  patientPhone: String,
  bookingTime: String,
  date: String,
  status: { type: String, default: "Pending" }

});
export default mongoose.model("Booking",BookingSchema);
