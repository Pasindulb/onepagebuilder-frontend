import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const signup = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
};

export const signin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data; // expects { token: string }
};
