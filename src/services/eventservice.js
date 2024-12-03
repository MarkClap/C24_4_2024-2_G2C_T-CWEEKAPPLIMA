import axios from './axios';

export const getAllEvents = async () => {
    try {
        const response = await axios.get('/api/events/all');
        return response.data; // Retorna la lista de eventos
    } catch (error) {
        console.error('Error al obtener los eventos:', error.response || error);
        throw error;
    }
};

export const addEvent = async (eventRequest) => {
    try {
        const response = await axios.post('/api/events/add', eventRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar el evento:', error.response || error);
        throw error;
    }
};
