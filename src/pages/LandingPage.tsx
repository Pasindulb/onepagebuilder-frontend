import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroColorAnimation from "../components/home/Hero";
import Navbar from "../components/home/MainNavbar";
import { AuthContext } from "../context/AuthContext";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleGoToProject = () => {
    navigate("/projects");
  };

  const isAuthenticated = !!authContext?.token;

  return (
    <div className="relative">
      <Navbar
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onGoToProject={handleGoToProject}
      />
      <HeroColorAnimation />
    </div>
  );
};

export default LandingPage;
