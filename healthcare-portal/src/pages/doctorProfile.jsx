import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase"; // your firebase config

const DoctorProfile = () => {
  const { user } = useAuth(); // Firebase authenticated user
  const storage = getStorage(app);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    qualifications: "",
    location: "",
    hospital: "",
    contactNumber: "",
    availableSlots: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload image to Firebase
  const uploadImageToFirebase = async () => {
    if (!imageFile) return "";

    const storageRef = ref(storage, `doctor_images/${user.uid}/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const imageUrl = await uploadImageToFirebase();

      const payload = {
        uid: user.uid,
        ...formData,
        availableSlots: formData.availableSlots.split(",").map((s) => s.trim()),
        imageUrl,
      };

      await axios.post("http://localhost:5000/api/profile/doctor", payload);

      alert("Doctor profile saved!");
    } catch (error) {
      console.error("Failed to save doctor profile:", error);
      alert("Error saving profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "specialization", "qualifications", "hospital", "contactNumber"].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Available Slots (comma-separated)</label>
          <input
            type="text"
            name="availableSlots"
            value={formData.availableSlots}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., 10:00 AM, 3:00 PM"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Doctor Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
