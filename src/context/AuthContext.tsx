import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number;
    sub: string;  // 'sub' is the standard JWT field for subject (email in this case)
    role: string;
    name: string; // Name field from JWT
    exp: number;
}

interface AuthContextType {
    token: string | null;
    user: JwtPayload | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState<string | null>(storedToken);
    const [user, setUser] = useState<JwtPayload | null>(storedToken ? jwtDecode(storedToken) : null);

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
        setUser(jwtDecode(token));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
