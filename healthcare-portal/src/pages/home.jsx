// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import { FaUser, FaPhone, FaHospitalAlt, FaCity, FaCalendarAlt } from "react-icons/fa";
import SpecialitiesSection from "./SpecialitiesSection";
const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero + Booking Form */}
      <div className="flex justify-center items-start bg-gray-50 px-6 py-10 gap-10">
        {/* Banner */}
        <div className="w-2/3 rounded-lg overflow-hidden">
          <img
            src="/doctors-banner.png"
            alt="Doctors"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        </div>

     
        
            
      <div className="text-2xl bg-pink-200">
        <SpecialitiesSection />

      </div>
      
    </>
  );
};

export default Home;
