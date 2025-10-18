import axios from 'axios';

// Base URL for API
export const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    console.log('[API] Making request to:', config.url);
    console.log('[API] Token exists:', !!token);
    console.log('[API] UserData exists:', !!userData);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add User-Id header if available
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('[API] Parsed user:', user);
        if (user.id) {
          config.headers['User-Id'] = user.id.toString();
          console.log('[API] Added User-Id header:', user.id);
        } else {
          console.warn('[API] User object exists but no id field:', user);
        }
      } catch (error) {
        console.error('[API] Error parsing user data:', error);
      }
    } else {
      console.warn('[API] No userData in localStorage');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API] Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('[API] Error response:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('[API] Unauthorized/Forbidden - clearing auth and redirecting');
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('currentProject');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
