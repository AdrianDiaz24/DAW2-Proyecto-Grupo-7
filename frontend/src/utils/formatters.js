/**
 * @file Funciones de utilidad para formatear fechas.
 * @description Contiene funciones para formatear fechas en diferentes formatos.
 */

/**
 * @function formatDate
 * @description Formatea una fecha a un formato largo y legible.
 * @param {string|Date} date - La fecha a formatear.
 * @returns {string} La fecha formateada (e.g., "2 de diciembre de 2025, 14:30").
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
 * @function formatDateShort
 * @description Formatea una fecha a un formato corto (DD/MM/YYYY).
 * @param {string|Date} date - La fecha a formatear.
 * @returns {string} La fecha formateada en formato corto.
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
 * @function timeAgo
 * @description Calcula y formatea el tiempo transcurrido desde una fecha dada hasta ahora.
 * @param {string|Date} date - La fecha desde la que calcular el tiempo transcurrido.
 * @returns {string} Una cadena que representa el tiempo transcurrido (e.g., "Hace 2 horas").
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
