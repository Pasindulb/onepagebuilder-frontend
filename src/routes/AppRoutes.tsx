import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/LandingPage";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authContext = useContext(AuthContext);
    return authContext?.token ? <>{children}</> : <Navigate to="/signin" />;
};

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
