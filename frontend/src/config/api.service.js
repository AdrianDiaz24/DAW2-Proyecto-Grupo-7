/**
 * @file Configuración del servicio de API con Axios.
 * @description Crea una instancia de Axios con configuración base e interceptores para el manejo de tokens y errores.
 * @requires axios
 */
import axios from 'axios';

/**
 * @constant {string} API_URL
 * @description URL base de la API del backend.
 * Lee de la variable de entorno REACT_APP_API_URL.
 * Fallback a http://localhost:4000 solo para desarrollo local.
 * En producción, REACT_APP_API_URL DEBE estar configurada.
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

/**
 * @constant {AxiosInstance} api
 * @description Instancia de Axios configurada para las peticiones a la API.
 */
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * @function request-interceptor
 * @description Interceptor de peticiones de Axios que añade el token de autenticación a las cabeceras.
 */
// Interceptor para añadir token automáticamente
api.interceptors.request.use(
    (config) => {
        // Obtener token desde Zustand persist storage
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            try {
                const { state } = JSON.parse(authStorage);
                const token = state?.token;
                if (token && token !== '') {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error parsing auth storage:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * @function response-interceptor
 * @description Interceptor de respuestas de Axios que maneja errores, especialmente los de autenticación (401).
 */
// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Limpiar el storage de Zustand
            localStorage.removeItem('auth-storage');
            // Redirigir al login
            window.location.href = '/login';
        }

        const formattedError = {
            message: error.response?.data?.message || error.message || 'Error desconocido',
            status: error.response?.status,
            data: error.response?.data
        };

        return Promise.reject(formattedError);
    }
);

export default api;
