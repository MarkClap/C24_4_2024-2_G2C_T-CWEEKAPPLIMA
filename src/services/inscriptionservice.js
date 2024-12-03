import axios from './axios';

const createInscription = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token); // Verifica si el token está presente
  
      if (!token) {
        throw new Error('No estás autenticado');
      }
  
      const response = await axios.post('/api/inscriptions/add', {
        eventId: eventId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      return response.data; // Exitoso
    } catch (error) {
      console.error('Error en la inscripción:', error.response?.data || error.message || error);
      throw error.response?.data || 'Error al inscribirse';
    }
  };
  