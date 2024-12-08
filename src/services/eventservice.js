import axios from './config';

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

export const getEventById = async (id) => {
    try {
        const response = await axios.get(`/api/events/${id}`);
        return response.data; // Retorna el evento como un objeto
    } catch (error) {
        console.error('Error al obtener los detalles del evento:', error.response || error);
        throw error;
    }
};

export const deleteEventById = async (eventId) => {
    try {
        const response = await axios.delete(`/api/events/delete/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el evento:', error.response || error);
        throw error;
    }
};

export const updateEvent = async (eventId, eventRequest) => {
    try {
        const response = await axios.put(`/api/events/update/${eventId}`, eventRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el evento:', error.response || error);
        throw error;
    }
};
