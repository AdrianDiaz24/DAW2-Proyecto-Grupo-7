/**
 * @file Configuración de la API y función de fetch.
 * @description Centraliza la URL base, los endpoints y una función `apiFetch` para realizar peticiones al backend.
 */

/**
 * @constant {string} API_URL
 * @description La URL base del backend, obtenida de las variables de entorno o un valor por defecto.
 */
// Obtener la URL del backend desde variables de entorno o usar valor por defecto
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

/**
 * @namespace apiConfig
 * @description Un objeto que contiene la configuración de la API.
 * @property {string} baseURL - La URL base del backend.
 * @property {object} endpoints - Un objeto con los endpoints específicos de la API.
 */
// Exportar la configuración
export const apiConfig = {
    baseURL: API_URL,
    endpoints: {
        register: `${API_URL}/api/auth/register`,
        login: `${API_URL}/api/auth/login`,
        profile: `${API_URL}/api/auth/profile`,
        registros: `${API_URL}/api/registros`,
    }
};

/**
 * @function apiFetch
 * @description Una función de ayuda para realizar peticiones `fetch` a la API, añadiendo automáticamente el token de autenticación.
 * @param {string} endpoint - El endpoint de la API al que se hará la petición.
 * @param {object} [options={}] - Opciones adicionales para la petición `fetch`.
 * @returns {Promise<Response>} La respuesta de la petición `fetch`.
 * @async
 */
// Función helper para hacer fetch con configuración por defecto
export const apiFetch = async (endpoint, options = {}) => {
    // Obtener el estado de autenticación desde el storage de Zustand
    const authStorage = localStorage.getItem('auth-storage');
    let token = null;

    if (authStorage) {
        try {
            const { state } = JSON.parse(authStorage);
            if (state && state.token) {
                token = state.token;
            }
        } catch (e) {
            console.error("Error parsing auth-storage from localStorage", e);
        }
    }

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // Si existe un token, añadirlo a los headers de autorización
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const defaultOptions = {
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        mode: 'cors',
        ...options,
    };

    const response = await fetch(endpoint, defaultOptions);
    return response;
};

export default apiConfig;