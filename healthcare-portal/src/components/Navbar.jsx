// src/components/Navbar.jsx
import { FaPhoneAlt, FaUserCircle, FaUpload } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import DoctorPages from "../pages/DoctorPages";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3 border-b">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src="https://cdn.vectorstock.com/i/2000v/21/16/medical-logo-symbol-set-vector-40432116.avif" alt="" className="h-10" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">arogyaBridge</h1>
            <p className="text-xl text-gray-500 -mt-1">Making bridge to healthcare</p>
          </div>
        </div>

        {/* Middle: Location + Search */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <MdLocationOn className="text-blue-500" />
            Your Location
          </span>
          <select className="border px-2 py-1 rounded text-sm">
            <option>Doctor</option>
            <option>Patient</option>
          </select>
          <input
            type="text"
            placeholder="Search Doctors, Medicines, Lab Test"
            className="px-3 py-1 border rounded w-80 text-sm"
          />
        </div>

        {/* Right: Call + Sign in */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1 text-blue-700">
            <FaPhoneAlt />
            <span className="font-bold">7799111544</span>
          </div>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-1 rounded-full">
            <FaUserCircle /> Sign in
          </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="bg-blue-100 px-6 py-2 flex items-center justify-between text-sm font-semibold">
        <ul className="flex gap-6">
          <li className="hover:text-blue-700 cursor-pointer">Home</li>
          <li className="hover:text-blue-700 cursor-pointer">About Us</li>
          <li className="hover:text-blue-700 cursor-pointer">ICDM</li>
          <li className="hover:text-blue-700 cursor-pointer">< Link to="/doctor">Doctors</Link></li>
          <li className="hover:text-blue-700 cursor-pointer">Hospitals</li>
          <li className="hover:text-blue-700 cursor-pointer">Medicine</li>
          <li className="hover:text-blue-700 cursor-pointer">Labs</li>
        </ul>
        
     
      </nav>

    </header>
  );
};

export default Navbar;
