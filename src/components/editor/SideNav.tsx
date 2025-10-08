import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './SideNav.css'; // Import the CSS file

interface Section {
    id: string;
    label: string;
}

const SideNav: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Dark mode state with localStorage persistence
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    // Load theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = savedTheme === "dark";
        setIsDarkMode(prefersDark);
        
        const htmlElement = document.documentElement;
        if (prefersDark) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, []);

    // Function to toggle dark mode and save to localStorage
    const toggleDarkMode = (isDark: boolean) => {
        setIsDarkMode(isDark);
        localStorage.setItem('darkMode', JSON.stringify(isDark));
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
        
        console.log("Theme changed to:", isDark ? "dark" : "light");
    };

    // Apply dark mode class to document body
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const sections: Section[] = [
        { id: "hero", label: "Hero" },
        { id: "about", label: "About" },
        { id: "services", label: "Services" },
        { id: "features", label: "Features" },
        { id: "contact", label: "Contact" },
        { id: "footer", label: "Footer" },
    ];

    const handleSectionClick = (sectionId: string) => {
        // This will scroll to the section in the preview
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleDashboardClick = () => {
        navigate("/dashboard");
    };

    if (!authContext?.user) {
        return null;
    }

    const { name, sub: email } = authContext.user;

    return (
        <div className="sidenav">
            {/* User Info Section */}
            <div className="sidenav-user">
                <div className="user-avatar">
                    {name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="user-info">
                    <h3 className="user-name">{name || "User"}</h3>
                    <p className="user-email">{email || "email@example.com"}</p>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="sidenav-section">
                <h4 className="section-title">Navigation</h4>
                <button 
                    className="nav-item"
                    onClick={handleDashboardClick}
                >
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Dashboard</span>
                </button>
            </div>

            {/* Editing Section */}
            <div className="sidenav-section">
                <h4 className="section-title">Edit Sections</h4>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className="nav-item"
                        onClick={() => handleSectionClick(section.id)}
                    >
                        <span className="nav-icon">✏️</span>
                        <span className="nav-label">{section.label}</span>
                    </button>
                ))}
            </div>

            {/* Theme Toggle Section */}
            <div className="sidenav-section theme-section">
                <div className="theme-toggle-container">
                    <button 
                        className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                        onClick={() => toggleDarkMode(false)}
                        aria-label="Switch to Light Mode"
                    >
                        <span className="theme-icon">☀️</span>
                        <span className="theme-label">Light</span>
                    </button>
                    
                    <button 
                        className={`theme-option ${isDarkMode ? 'active' : ''}`}
                        onClick={() => toggleDarkMode(true)}
                        aria-label="Switch to Dark Mode"
                    >
                        <span className="theme-icon">🌙</span>
                        <span className="theme-label">Dark</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNav;