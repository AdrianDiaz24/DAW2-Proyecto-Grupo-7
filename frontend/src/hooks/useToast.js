/**
 * @file Hook personalizado para mostrar notificaciones (toasts).
 * @description Proporciona funciones para mostrar fácilmente notificaciones de éxito, error, información y carga.
 * @requires react-hot-toast
 */
import toast from 'react-hot-toast';

/**
 * @function useToast
 * @description Un hook personalizado que abstrae la librería `react-hot-toast` para un uso simplificado.
 * @returns {object} Un objeto con funciones para mostrar diferentes tipos de toasts.
 * @property {function} success - Muestra un toast de éxito.
 * @property {function} error - Muestra un toast de error.
 * @property {function} info - Muestra un toast de información.
 * @property {function} loading - Muestra un toast de carga.
 * @property {function} dismiss - Oculta un toast específico.
 * @property {function} promise - Muestra toasts automáticamente para el ciclo de vida de una promesa.
 */
export const useToast = () => {
    /**
     * @function success
     * @description Muestra un toast de éxito.
     * @param {string} message - El mensaje a mostrar.
     * @param {object} [options] - Opciones adicionales para el toast.
     */
    const success = (message, options = {}) => {
        toast.success(message, {
            duration: 3000,
            position: 'top-right',
            ...options
        });
    };

    /**
     * @function error
     * @description Muestra un toast de error.
     * @param {string} message - El mensaje a mostrar.
     * @param {object} [options] - Opciones adicionales para el toast.
     */
    const error = (message, options = {}) => {
        toast.error(message, {
            duration: 4000,
            position: 'top-right',
            ...options
        });
    };

    /**
     * @function info
     * @description Muestra un toast de información.
     * @param {string} message - El mensaje a mostrar.
     * @param {object} [options] - Opciones adicionales para el toast.
     */
    const info = (message, options = {}) => {
        toast(message, {
            icon: 'ℹ️',
            duration: 3000,
            position: 'top-right',
            ...options
        });
    };

    /**
     * @function loading
     * @description Muestra un toast de carga que puede ser actualizado o descartado.
     * @param {string} message - El mensaje a mostrar.
     * @returns {string} El ID del toast de carga.
     */
    const loading = (message) => {
        return toast.loading(message, {
            position: 'top-right'
        });
    };

    /**
     * @function dismiss
     * @description Oculta un toast específico por su ID.
     * @param {string} toastId - El ID del toast a ocultar.
     */
    const dismiss = (toastId) => {
        toast.dismiss(toastId);
    };

    /**
     * @function promise
     * @description Maneja una promesa y muestra toasts de carga, éxito o error automáticamente.
     * @param {Promise<any>} promise - La promesa a manejar.
     * @param {object} messages - Los mensajes para cada estado de la promesa.
     * @param {string} [messages.loading] - Mensaje mientras la promesa está pendiente.
     * @param {string} [messages.success] - Mensaje cuando la promesa se resuelve con éxito.
     * @param {string} [messages.error] - Mensaje cuando la promesa es rechazada.
     * @returns {Promise<any>} La promesa original.
     */
    const promise = (promise, messages) => {
        return toast.promise(
            promise,
            {
                loading: messages.loading || 'Cargando...',
                success: messages.success || '¡Éxito!',
                error: messages.error || 'Error'
            },
            {
                position: 'top-right'
            }
        );
    };

    return { success, error, info, loading, dismiss, promise };
};
