import apiClient from './config';

export const signup = async (name: string, email: string, password: string) => {
    const response = await apiClient.post('/auth/signup', { name, email, password });
    return response.data;
};

export const signin = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/signin', { email, password });
    return response.data; // expects { token: string }
};
