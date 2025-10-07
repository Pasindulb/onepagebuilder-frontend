import React from "react";
import { useNavigate } from "react-router-dom";
import HeroColorAnimation from "../components/home/Hero";
import Navbar from "../components/home/Navbar";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // integrate your sign-in logic here (MSAL, OAuth, etc.)
    navigate("/signin");
  };

  const handleGoToWorkspace = () => {
    navigate("/workspace");
  };

  const isAuthenticated = false; // replace with your auth state (from context, MSAL, etc.)

  return (
    <div className="relative">
      <Navbar
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onGoToWorkspace={handleGoToWorkspace}
      />
      <HeroColorAnimation />
    </div>
  );
};

export default LandingPage;
