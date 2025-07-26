import Appointment from "../models/Appointment.js";

// POST /api/appointments/book
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    // Make sure the requester is a patient
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can book appointments" });
    }

    const newAppointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      date,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked", appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment", error: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    // Only doctors can access
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can view appointments" });
    }

    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate("patientId", "name email") // get patient details
      .sort({ date: 1 }); // sort by date

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments", error: err.message });
  }
};
// PATCH /api/appointments/:id
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Only doctors can perform this action
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can update appointments" });
    }

    // Validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, doctorId: req.user._id },
      { status },
      { new: true }
    ).populate("patientId", "name phoneNumber");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (err) {
    res.status(500).json({ message: "Error updating appointment", error: err.message });
  }
};
// GET /api/appointments/mine
export const getMyAppointments = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can view their appointments" });
    }

    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate("doctorId", "name phoneNumber");

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Error fetching your appointments", error: err.message });
  }
};

