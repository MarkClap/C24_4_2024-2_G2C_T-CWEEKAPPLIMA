import axios from './config'; // Suponiendo que 'config' contiene la configuración de axios, como la base URL

// Función para obtener todas las carreras
export const getAllCareers = async () => {
    try {
        const response = await axios.get('/api/career/all', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Si estás usando JWT para autenticación
            }
        });
        return response.data; // Retorna la lista de carreras
    } catch (error) {
        console.error('Error al obtener las carreras:', error.response || error);
        throw error;
    }
};
