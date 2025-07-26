import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({}); // hold form data per doctor

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/all");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (doctorId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [doctorId]: {
        ...prev[doctorId],
        [field]: value,
      },
    }));
  };

  const handleAppointment = async (doctorId) => {
    const data = formData[doctorId];
    if (!data?.patientName || !data?.patientEmail || !data?.slot) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments/book", {
        doctorId,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        slot: data.slot,
      });
      alert("Appointment booked successfully!");
      setFormData((prev) => ({ ...prev, [doctorId]: {} })); // clear form
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to book appointment.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
        >
          <img
            src={doctor.imageUrl || "https://via.placeholder.com/150"}
            alt={doctor.name}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-xl font-bold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.qualifications}</p>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-gray-600 mb-2">{doctor.hospital}</p>

          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 mb-2 w-full"
            value={formData[doctor._id]?.patientName || ""}
            onChange={(e) =>
              handleInputChange(doctor._id, "patientName", e.target.value)
            }
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-2 mb-2 w-full"
            value={formData[doctor._id]?.patientEmail || ""}
            onChange={(e) =>
              handleInputChange(doctor._id, "patientEmail", e.target.value)
            }
          />

          <select
            className="border p-2 mb-2 w-full"
            value={formData[doctor._id]?.slot || ""}
            onChange={(e) =>
              handleInputChange(doctor._id, "slot", e.target.value)
            }
          >
            <option value="">Select Slot</option>
            {doctor.availableSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleAppointment(doctor._id)}
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default DoctorPage;
