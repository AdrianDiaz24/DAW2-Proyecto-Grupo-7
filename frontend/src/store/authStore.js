import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: '', // Cambiado a cadena vacía para evitar 'null' en localStorage

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
