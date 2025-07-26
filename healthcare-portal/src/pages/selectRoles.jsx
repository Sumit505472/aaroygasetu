// src/pages/SelectRole.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const SelectRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { role });

    // Redirect based on role
    navigate(role === "doctor" ? "/doctor-portal" : "/patient-portal");
  };

  return (
    <div>
      <h2>Select Your Role</h2>
      <button onClick={() => handleRoleSelect("doctor")}>I'm a Doctor</button>
      <button onClick={() => handleRoleSelect("patient")}>I'm a Patient</button>
    </div>
  );
};

export default SelectRole;
