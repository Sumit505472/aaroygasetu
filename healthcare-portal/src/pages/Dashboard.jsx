import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // your firebase config
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRole(data.role || "patient"); // default fallback
        } else {
          setRole("patient"); // if user not found, assume patient
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [auth]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Dashboard</h1>

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* Doctor Card */}
        <div
          style={{
            border: "1px solid #aaa",
            borderRadius: "10px",
            padding: "1rem",
            backgroundColor: "#ffe4e1",
            width: "200px",
            cursor: role === "doctor" ? "pointer" : "not-allowed",
            opacity: role === "doctor" ? 1 : 0.5,
          }}
          onClick={() => {
            if (role === "doctor") {
              navigate("/doctor-portal");
            } else {
              alert("Access denied. Only doctors can access this section.");
            }
          }}
        >
          <h3>Doctor Section</h3>
          <p>View and manage patients</p>
        </div>

        {/* Patient Card */}
        <div
          style={{
            border: "1px solid #aaa",
            borderRadius: "10px",
            padding: "1rem",
            backgroundColor: "#e0ffe0",
            width: "200px",
            cursor: role === "patient" ? "pointer" : "not-allowed",
            opacity: role === "patient" ? 1 : 0.5,
          }}
          onClick={() => {
            if (role === "patient") {
              navigate("/patient-portal");
            } else {
              alert("Access denied. Only patients can access this section.");
            }
          }}
        >
          <h3>Patient Section</h3>
          <p>Access your health info</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
