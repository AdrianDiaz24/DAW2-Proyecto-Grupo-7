/**
 * @file Servicio para las operaciones del diario.
 * @description Proporciona métodos para interactuar con la API del diario (crear, leer, actualizar, eliminar entradas).
 * @requires ../config/api.service
 */
import api from '../config/api.service';

/**
 * @namespace diarioService
 * @description Un objeto que agrupa todos los métodos de servicio para el diario.
 */
export const diarioService = {
    /**
     * @function create
     * @description Crea una nueva entrada en el diario.
     * @param {object} diarioData - Los datos de la entrada a crear (título, cuerpo, etc.).
     * @returns {Promise<object>} La nueva entrada creada.
     * @async
     */
    create: async (diarioData) => {
        const { data } = await api.post('/api/diario', diarioData);
        return data;
    },

    /**
     * @function getAll
     * @description Obtiene todas las entradas del diario del usuario autenticado.
     * @returns {Promise<Array<object>>} Una lista de las entradas del diario.
     * @async
     */
    getAll: async () => {
        const { data } = await api.get('/api/diario');
        return data;
    },

    /**
     * @function getById
     * @description Obtiene una entrada del diario por su ID.
     * @param {string} id - El ID de la entrada a obtener.
     * @returns {Promise<object>} La entrada del diario solicitada.
     * @async
     */
    getById: async (id) => {
        const { data } = await api.get(`/api/diario/${id}`);
        return data;
    },

    /**
     * @function update
     * @description Actualiza una entrada del diario existente.
     * @param {string} id - El ID de la entrada a actualizar.
     * @param {object} diarioData - Los nuevos datos para la entrada.
     * @returns {Promise<object>} La entrada actualizada.
     * @async
     */
    update: async (id, diarioData) => {
        const { data } = await api.put(`/api/diario/${id}`, diarioData);
        return data;
    },

    /**
     * @function delete
     * @description Elimina una entrada del diario.
     * @param {string} id - El ID de la entrada a eliminar.
     * @returns {Promise<object>} Un mensaje de confirmación.
     * @async
     */
    delete: async (id) => {
        const { data } = await api.delete(`/api/diario/${id}`);
        return data;
    },

    /**
     * @function accessWithPassword
     * @description Accede a una entrada de diario protegida mediante una contraseña.
     * @param {string} id - El ID de la entrada a la que se quiere acceder.
     * @param {string} password - La contraseña para acceder a la entrada.
     * @returns {Promise<object>} La entrada del diario si la contraseña es correcta.
     * @async
     */
    accessWithPassword: async (id, password) => {
        const { data } = await api.post(`/api/diario/${id}/acceso`, { password });
        return data;
    }
};
