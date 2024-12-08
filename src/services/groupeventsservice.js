import axios from './config'; // Importa la configuración de Axios que ya creaste

export const getAllGroupEvents = async () => {
    try {
        // Realizar la solicitud GET al endpoint del backend
        const response = await axios.get('/api/group-events/all', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Autenticación con token JWT
            }
        });

        // Retorna la data de la respuesta que contiene la lista de eventos de grupo
        return response.data;
    } catch (error) {
        console.error('Error al obtener los eventos de grupo:', error.response || error);
        throw error; // Lanza un error en caso de que falle la solicitud
    }
};

export const getTopScores = async () => {
    try {
        // Realizar la solicitud GET al endpoint /api/scores/top del backend
        const response = await axios.get('/api/group-events/top', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Autenticación con token JWT
            }
        });

        // Retorna la data de la respuesta que contiene la lista de puntajes por grupo
        return response.data;
    } catch (error) {
        console.error('Error al obtener los puntajes de los grupos:', error.response || error);
        throw error; // Lanza un error en caso de que falle la solicitud
    }
};
