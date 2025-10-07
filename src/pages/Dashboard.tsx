import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext?.user) {
        return <p>Loading...</p>;
    }

    const { id, sub: email, role } = authContext.user; // Destructure 'sub' as 'email'
    console.log("User info:", authContext.user);
    const handleLogout = () => {
        authContext.logout();
        navigate("/signin");
    };

    return (
        <div className="p-6">
            <h1>Dashboard</h1>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role}</p>

            <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
