import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const userRef = doc(db, "users", user.uid);

      // fetch user profile
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(userSnap.data());
      }

      // fetch appointments
      const appointmentsRef = collection(userRef, "appointments");
      const apptSnap = await getDocs(appointmentsRef);
      const apptList = apptSnap.docs.map((doc) => doc.data());
      setAppointments(apptList);

      // fetch prescriptions (optional)
      const prescriptionsRef = collection(userRef, "prescriptions");
      const prescriptionSnap = await getDocs(prescriptionsRef);
      const prescriptionList = prescriptionSnap.docs.map((doc) => doc.data());
      setPrescriptions(prescriptionList);
    };

    fetchData();
  }, [user]);

  if (!profile) return <p className="p-6">Loading patient data...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-blue-600 font-medium">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Appointments</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Prescriptions</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Profile</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointments */}
          {appointments.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
              {appointments.map((appt, idx) => (
                <div key={idx} className="mb-2">
                  <p className="text-gray-700">🧑‍⚕️ {appt.doctorName}</p>
                  <p className="text-gray-500">🗓️ {new Date(appt.time).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">No upcoming appointments.</h2>
            </div>
          )}

          {/* Prescriptions */}
          {prescriptions.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">Prescriptions</h2>
              {prescriptions.map((presc, idx) => (
                <div key={idx} className="mb-2">
                  <p className="text-gray-700">💊 {presc.medicine}</p>
                  <p className="text-gray-500">{presc.dosage}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold">No active prescriptions.</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
