import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, provider } from "../configs/firebase.jsx";
import Login from "../components/Login.jsx";

function SignUp() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider || provider);
      console.log("User signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="">
      <LoginUI 
        googleText="Sign Up with Google" 
        loginText="Sign Up" 
        heading="Create an Account" 
        subheading="Or Login" 
        signupText="Already have an account?"
        onGoogleSignIn={handleGoogleSignIn} 
      />
    </div>
  );
}

export default SignUp;
