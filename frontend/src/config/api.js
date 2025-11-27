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
    }
};

// Función helper para hacer fetch con configuración por defecto
export const apiFetch = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        mode: 'cors',
        ...options,
    };

    const response = await fetch(endpoint, defaultOptions);
    return response;
};

export default apiConfig;