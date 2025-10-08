import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Editor from "../components/editor/Editor";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/LandingPage";
import Auth from "../pages/Auth";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authContext = useContext(AuthContext);
    return authContext?.token ? <>{children}</> : <Navigate to="/signin" />;
};

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Auth />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
