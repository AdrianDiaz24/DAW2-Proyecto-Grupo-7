/**

 Configuración de la API
 Centraliza las URLs y configuraciones del backend*/

// Obtener la URL del backend desde variables de entorno o usar valor por defecto
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

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