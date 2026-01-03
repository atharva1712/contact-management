import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup
export const signup = async (userData) => {
  const response = await authApi.post('/api/auth/signup', userData);
  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await authApi.post('/api/auth/login', userData);
  return response.data;
};

// Get current user
export const getCurrentUser = async (token) => {
  const response = await authApi.get('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default authApi;

