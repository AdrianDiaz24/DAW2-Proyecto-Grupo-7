/**
 * Formatea una fecha a formato legible
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);

    // Verificar si es fecha válida
    if (isNaN(dateObj.getTime())) return '';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return dateObj.toLocaleDateString('es-ES', options);
};

/**
 * Formatea una fecha a formato corto
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada (DD/MM/YYYY)
 */
export const formatDateShort = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return '';

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};

/**
 * Calcula el tiempo transcurrido desde una fecha
 * @param {string|Date} date - Fecha
 * @returns {string} - Tiempo transcurrido (ej: "Hace 2 horas")
 */
export const timeAgo = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    const seconds = Math.floor((new Date() - dateObj) / 1000);

    const intervals = {
        año: 31536000,
        mes: 2592000,
        semana: 604800,
        día: 86400,
        hora: 3600,
        minuto: 60,
        segundo: 1
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInInterval);

        if (interval >= 1) {
            return `Hace ${interval} ${name}${interval > 1 ? 's' : ''}`;
        }
    }

    return 'Justo ahora';
};

