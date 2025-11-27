import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            // Guardar usuario y token tras login/registro
            setAuth: (userData, token) =>
                set(() => ({
                    user: userData,
                    token: token
                })),

            // Limpiar datos al hacer logout
            logout: () =>
                set(() => ({
                    user: null,
                    token: null
                }))
        }),
        {
            name: 'auth-storage'
        }
    )
);
