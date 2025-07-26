// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  if (!user) return <Navigate to="/login" />;
  if (loading) return <p>Loading...</p>;
  if (allowedRole && userRole !== allowedRole) return <Navigate to="/selectRole" />;

  return children;
};

export default ProtectedRoute;
