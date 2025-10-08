import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroColorAnimation from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import { AuthContext } from "../context/AuthContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleGoToWorkspace = () => {
    navigate("/dashboard");
  };

  const isAuthenticated = !!authContext?.token;

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
