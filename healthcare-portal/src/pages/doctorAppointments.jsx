import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/doctor/${doctorId}`);
        setAppointments(res.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };
    fetchBookings();
  }, [doctorId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Patient</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="border p-2">{appt.patientName}</td>
                <td className="border p-2">{appt.patientEmail}</td>
                <td className="border p-2">{appt.date}</td>
                <td className="border p-2">{appt.bookingTime}</td>
                <td className="border p-2">{appt.status}</td>
                <td className="border p-2">{appt.patientPhone}</td>
                <td className="border p-2 flex flex-col gap-1">
                  <a
                    href={`tel:${appt.patientPhone}`}
                    className="bg-green-500 text-white px-2 py-1 rounded text-center"
                  >
                    📞 Call
                  </a>
                  <Link
                    to={`/video-call/${appt._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-center"
                  >
                    🎥 Video Call
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointments;
