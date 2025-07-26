import React, { useEffect } from "react";
import { auth, provider, db } from "../firebase/firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Trigger the redirect
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle redirect result on component mount
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("User logged in via onAuthStateChanged:", user);

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
      }

      navigate("/selectRole");
    }
  });

  return () => unsubscribe();
}, [navigate]);


  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleSignIn}>Login with Google</button>
    </div>
  );
};

export default Login;
