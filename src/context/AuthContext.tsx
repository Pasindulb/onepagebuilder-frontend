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
    const storedUserData = localStorage.getItem("userData");
    
    const [token, setToken] = useState<string | null>(storedToken);
    const [user, setUser] = useState<JwtPayload | null>(() => {
        if (storedUserData) {
            try {
                return JSON.parse(storedUserData);
            } catch {
                return storedToken ? jwtDecode(storedToken) : null;
            }
        }
        return storedToken ? jwtDecode(storedToken) : null;
    });

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
        
        const decodedUser = jwtDecode<JwtPayload>(token);
        setUser(decodedUser);
        
        // Save user data to localStorage for API interceptor
        localStorage.setItem("userData", JSON.stringify(decodedUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("currentProject");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
