import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import DoctorDashboard from "./pages/doctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import SelectRole from "./pages/selectRoles";
import Home from "./pages/home";
import DoctorProfile from "./pages/doctorProfile";
import PatientProfile from "./pages/patientProfile";

import SpecialitiesPage from "./pages/specialities";
import DoctorPages from "./pages/DoctorPages";
import VideoCall from "./pages/videoCall";

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/doctor-portal" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
          <Route path ="patient-portal" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/selectRole" element={<SelectRole />} />
          <Route path="/doctor/profile" element={<ProtectedRoute allowedRole="doctor"><DoctorProfile /></ProtectedRoute>} />
          <Route path="/doctor" element={<DoctorPages />} />
          <Route path="/specialities" element={<SpecialitiesPage />} />
          <Route path="/video-call/:appointmentId" element={<VideoCall />} />

          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    
  );
}

export default App;
