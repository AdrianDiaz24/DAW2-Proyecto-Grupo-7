/**
 * @file Store de autenticación con Zustand.
 * @description Gestiona el estado de autenticación del usuario (usuario, token) y lo persiste en el almacenamiento local.
 * @requires zustand
 * @requires zustand/middleware
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @function useAuthStore
 * @description Hook de Zustand para acceder y manipular el estado de autenticación.
 * @returns {object} El store de autenticación con el estado y las acciones.
 * @property {object|null} user - El objeto de usuario si está autenticado, o `null`.
 * @property {string} token - El token JWT de autenticación.
 * @property {function} isAuthenticated - Una función computada que devuelve `true` si el usuario está autenticado.
 * @property {function} setAuth - Acción para guardar los datos del usuario y el token.
 * @property {function} logout - Acción para limpiar los datos de autenticación.
 */
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
