// service/index.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
});

export default instance;


// Logout function
export const logout = async () => {
  try {
    const response = await instance.post('/api/auth/signout');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error.response || error);
    throw error;
  }
};
