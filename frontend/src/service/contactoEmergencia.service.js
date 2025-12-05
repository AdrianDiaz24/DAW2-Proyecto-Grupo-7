/**
 * @file Servicio para las operaciones de contactos de emergencia.
 * @description Proporciona métodos para interactuar con la API de contactos de emergencia.
 * @requires ../config/api.service
 */
import api from '../config/api.service';

/**
 * @namespace contactoEmergenciaService
 * @description Un objeto que agrupa todos los métodos de servicio para los contactos de emergencia.
 */
export const contactoEmergenciaService = {
    /**
     * @function getAll
     * @description Obtiene todos los contactos de emergencia del usuario autenticado.
     * @returns {Promise<Array<object>>} Una lista de los contactos de emergencia.
     * @async
     */
    getAll: async () => {
        const { data } = await api.get('/api/contactos-emergencia');
        return data;
    },

    /**
     * @function create
     * @description Crea un nuevo contacto de emergencia.
     * @param {object} contactData - Datos del contacto (nombre, telefono, email, relacion).
     * @returns {Promise<object>} El contacto creado.
     * @async
     */
    create: async (contactData) => {
        const { data } = await api.post('/api/contactos-emergencia', contactData);
        return data;
    },

    /**
     * @function sendEmergencyEmail
     * @description Envía un email de emergencia a un contacto.
     * @param {string} contactoId - ID del contacto de emergencia.
     * @returns {Promise<object>} Respuesta del servidor.
     * @async
     */
    sendEmergencyEmail: async (contactoId) => {
        const { data } = await api.post(`/api/contactos-emergencia/${contactoId}/send-email`);
        return data;
    },
};

