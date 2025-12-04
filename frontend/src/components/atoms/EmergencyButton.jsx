/**
 * @file Botón de emergencia flotante.
 * @description Este componente renderiza un botón de emergencia fijo en la esquina superior derecha de la pantalla.
 * @requires React
 */
import React from 'react';
import '../../styles/atoms/EmergencyButton.css';

/**
 * @function EmergencyButton
 * @description Componente que representa un botón de emergencia flotante.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onClick - Función a ejecutar al hacer clic en el botón.
 * @returns {JSX.Element} El componente del botón de emergencia.
 */
const EmergencyButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="emergency-button"
            type="button"
            aria-label="Botón de emergencia SOS"
        >
            SOS
        </button>
    );
};

export default EmergencyButton;
