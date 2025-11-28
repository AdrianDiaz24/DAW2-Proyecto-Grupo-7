import api from '../config/api.service';

/**
 * Servicios del diario personal
 */
export const diarioService = {
    // Crear entrada de diario
    create: async (diarioData) => {
        const { data } = await api.post('/api/diario', diarioData);
        return data;
    },

    // Obtener todas las entradas del usuario
    getAll: async () => {
        const { data } = await api.get('/api/diario');
        return data;
    },

    // Obtener entrada por ID
    getById: async (id) => {
        const { data } = await api.get(`/api/diario/${id}`);
        return data;
    },

    // Actualizar entrada
    update: async (id, diarioData) => {
        const { data } = await api.put(`/api/diario/${id}`, diarioData);
        return data;
    },

    // Eliminar entrada
    delete: async (id) => {
        const { data } = await api.delete(`/api/diario/${id}`);
        return data;
    },

    // Acceder con contraseña (compartir)
    accessWithPassword: async (id, password) => {
        const { data } = await api.post(`/api/diario/${id}/acceso`, { password });
        return data;
    }
};

