import MedicalRecord from "../models/MedicalRecord.js";

// POST /api/records/upload
export const uploadRecord = async (req, res) => {
  try {
    const { patientId, notes } = req.body;

    // Only doctors can upload
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can upload medical records" });
    }

    const record = new MedicalRecord({
      doctorId: req.user._id,
      patientId,
      notes,
    });

    await record.save();
    res.status(201).json({ message: "Medical record uploaded", record });
  } catch (err) {
    res.status(500).json({ message: "Error uploading record", error: err.message });
  }
};
// GET /api/records/:userId
export const getRecordsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only allow:
    // - doctor to view any user's records
    // - patient to view only their own records
    if (req.user.role === "patient" && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Patients can only view their own records" });
    }

    const records = await MedicalRecord.find({ patientId: userId })
      .populate("doctorId", "name")
      .populate("patientId", "name");

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records", error: err.message });
  }
};
