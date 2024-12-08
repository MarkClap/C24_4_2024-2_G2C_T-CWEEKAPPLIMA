import axios from './config'; // Asegúrate de tener configurado axios correctamente

/**
 * Asignar roles ADMIN u ORGANIZADOR a un usuario.
 * @param {Object} request - Objeto que contiene userId y roleName.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const assignRole = async (request) => {
    try {
        const response = await axios.post('/api/admin/assign-role', request, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error al asignar rol:', error.response || error);
        throw error;
    }
};

/**
 * Remover roles ADMIN u ORGANIZADOR de un usuario.
 * @param {Object} request - Objeto que contiene userId y roleName.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const removeRole = async (request) => {
    try {
        const response = await axios.post('/api/admin/remove-role', request, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error al remover rol:', error.response || error);
        throw error;
    }
};

/**
 * Asignar rol de JURADO a un usuario y vincularlo a un evento.
 * @param {Object} request - Objeto que contiene userId y eventId.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const assignJuryRole = async (request) => {
    try {
        const response = await axios.post('/api/admin/assign-jury', request, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error al asignar rol de jurado:', error.response || error);
        throw error;
    }
};

/**
 * Remover rol de JURADO de un usuario y desvincularlo de un evento.
 * @param {Object} request - Objeto que contiene userId y eventId.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const removeJuryRole = async (request) => {
    try {
        const response = await axios.post('/api/admin/remove-jury', request, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error al remover rol de jurado:', error.response || error);
        throw error;
    }
};

/**
 * Obtener la lista de todos los usuarios.
 * @returns {Promise<Array>} - Lista de usuarios con información básica.
 */
export const getAllUsers = async () => {
    try {
        const response = await axios.get('/api/admin/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error.response || error);
        throw error;
    }
};
