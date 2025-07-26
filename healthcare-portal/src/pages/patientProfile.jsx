import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PatientProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patients/create", {
        ...formData,
        uid: user.uid,
      });
      navigate("/patient-portal");
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="input mb-3 w-full" required />
        <input name="age" placeholder="Age" type="number" onChange={handleChange} className="input mb-3 w-full" required />
        
        <select name="gender" onChange={handleChange} className="input mb-3 w-full" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} className="input mb-3 w-full" required />
        <textarea name="address" placeholder="Address" onChange={handleChange} className="input mb-3 w-full" required />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Save Profile</button>
      </form>
    </div>
  );
};

export default PatientProfile;
