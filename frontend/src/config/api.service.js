import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

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

