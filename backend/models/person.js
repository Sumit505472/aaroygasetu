import mongoose from "mongoose";

// Doctor Schema


const doctorSchema = new mongoose.Schema({
   
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  qualifications: { type: String, required: true },
  location: { type: String, required: true },
  hospital: { type: String, required: true },
  contactNumber: { type: String, required: true },
  imageUrl: { type: String, required: true }, // 🔥 Firebase Storage URL
  availableSlots: { type: [String], required: true }, // e.g. ["10:00 AM", "3:00 PM"]
});




const Doctor = mongoose.model("Doctor", doctorSchema);

// Patient Schema
const patientSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  gender: String,
  image:String,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  contactNumber: String,
  address: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// Export both models (not using `default` here)
export { Doctor, Patient };
