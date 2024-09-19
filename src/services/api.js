import axios from 'axios';
import { useSelector } from 'react-redux';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const authState = localStorage.getItem('authState');
    if (authState) {
      const { token } = JSON.parse(authState);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
