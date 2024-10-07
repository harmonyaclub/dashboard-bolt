import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_URL = 'https://api.example.com'; // Sostituisci con l'URL del tuo backend

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwt.decode(token);
    if (!decoded) return false;

    // Verifica se il token è scaduto
    const currentTime = Date.now() / 1000;
    if (typeof decoded === 'object' && decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};