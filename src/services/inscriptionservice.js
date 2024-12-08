// inscriptionService.js
import instance from './config';

export const inscriptionService = {
  getAllInscriptions: async () => {
    try {
      const response = await instance.get('/api/inscriptions/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all inscriptions:', error.response || error);
      throw error;
    }
  },

  getUserInscriptions: async () => {
    try {
      const response = await instance.get('/api/inscriptions/user-inscriptions');
      return response.data;
    } catch (error) {
      console.error('Error fetching user inscriptions:', error.response || error);
      throw error;
    }
  },

  createInscription: async (eventId) => {
    try {
      const response = await instance.post('/api/inscriptions/add', { eventId });
      return response.data;
    } catch (error) {
      console.error('Error creating inscription:', error.response || error);
      throw error;
    }
  },

  // Delete a specific inscription
  deleteInscription: async (inscriptionId) => {
    try {
      const response = await instance.delete(`/api/inscriptions/delete/${inscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting inscription:', error.response || error);
      throw error;
    }
  }
};

export default inscriptionService;