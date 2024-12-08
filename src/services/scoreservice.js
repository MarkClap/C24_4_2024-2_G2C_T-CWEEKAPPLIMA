import axios from './config';

// Obtener todos los puntajes
export const getAllScores = async () => {
  try {
      const response = await axios.get('/api/scores/all');
      return response.data; // Retorna la lista de puntajes
  } catch (error) {
      console.error('Error al obtener los puntajes:', error.response || error);
      throw error;
  }
};

// Agregar un puntaje
export const addScore = async (scoreData) => {
  try {
      const response = await axios.post('/api/scores/add', scoreData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error al agregar el puntaje:', error.response || error);
      throw error;
  }
};

// Obtener los puntajes del jurado actual
export const getMyScores = async () => {
  try {
      const response = await axios.get('/api/scores/my-scores');
      return response.data; // Retorna los puntajes del jurado actual
  } catch (error) {
      console.error('Error al obtener mis puntajes:', error.response || error);
      throw error;
  }
};

// Actualizar un puntaje
export const updateScore = async (scoreId, scoreData) => {
    try {
        const response = await axios.put(`/api/scores/update/${scoreId}`, scoreData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el puntaje:', error.response || error);
        throw error;
    }
};

// Obtener todos los jurados
export const getAllJurors = async () => {
  try {
    const response = await axios.get('/api/scores/alljurados'); // Solicitud GET al backend
    return response.data; // Retorna la lista de jurados
  } catch (error) {
    console.error('Error al obtener los jurados:', error.response || error);
    throw error;
  }
};

// Eliminar un puntaje
export const deleteScore = async (scoreId) => {
    try {
        const response = await axios.delete(`/api/scores/delete/${scoreId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el puntaje:', error.response || error);
        throw error;
    }
};
