import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '', // Cambiado a cadena vacía para evitar 'null' en localStorage

            // Computed property para verificar autenticación
            isAuthenticated: () => {
                const state = get();
                return !!(state.user && state.token);
            },

            // Guardar usuario y token tras login/registro
            setAuth: (userData, token) =>
                set(() => ({
                    user: userData,
                    token: token || '', // Asegurarse de que el token nunca sea nulo
                })),

            // Limpiar datos al hacer logout
            logout: () =>
                set(() => ({
                    user: null,
                    token: '', // Cambiado a cadena vacía
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
