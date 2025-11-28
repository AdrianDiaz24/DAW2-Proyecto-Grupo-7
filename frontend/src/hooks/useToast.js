import toast from 'react-hot-toast';

/**
 * Hook personalizado para mostrar notificaciones toast
 */
export const useToast = () => {
    const success = (message, options = {}) => {
        toast.success(message, {
            duration: 3000,
            position: 'top-right',
            ...options
        });
    };

    const error = (message, options = {}) => {
        toast.error(message, {
            duration: 4000,
            position: 'top-right',
            ...options
        });
    };

    const info = (message, options = {}) => {
        toast(message, {
            icon: 'ℹ️',
            duration: 3000,
            position: 'top-right',
            ...options
        });
    };

    const loading = (message) => {
        return toast.loading(message, {
            position: 'top-right'
        });
    };

    const dismiss = (toastId) => {
        toast.dismiss(toastId);
    };

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

