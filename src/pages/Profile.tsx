import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const Profile: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext?.user) {
        return <p>Loading...</p>;
    }

    const { id, sub: email, name, role } = authContext.user; // Destructure 'sub' as 'email'
    console.log("User info:", authContext.user);
    const handleLogout = () => {
        authContext.logout();
        navigate("/signin");
    };

    return (       
        <div className="flex h-screen overflow-hidden">
            <SideNav />
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Profile</h1>

                    <div className="bg-white rounded-lg shadow p-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">ID</label>
                            <p className="text-lg">{id}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="text-lg">{email}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <p className="text-lg">{name}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500">Role</label>
                            <p className="text-lg">{role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
