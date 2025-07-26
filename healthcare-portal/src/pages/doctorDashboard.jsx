import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};  

export default DoctorDashboard;
