import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
