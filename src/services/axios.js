// service/index.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081', // URL del backend
  withCredentials: true, // Esto es esencial para manejar cookies automáticamente
});

export default instance;


// Logout function
export const logout = async () => {
  try {
    const response = await instance.post('/api/auth/signout');
    return response.data; // Maneja la respuesta si es necesario
  } catch (error) {
    console.error('Error during logout:', error.response || error);
    throw error;
  }
};
