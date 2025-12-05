/**
 * @file Componente de progreso circular.
 * @description Muestra un indicador de progreso en forma de círculo con un porcentaje.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/CircularProgress.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/CircularProgress.css";

/**
 * @function CircularProgress
 * @description Renderiza un indicador de progreso circular.
 * @param {object} props - Las propiedades del componente.
 * @param {number} props.percentage - El porcentaje de progreso a mostrar (0-100).
 * @param {number} [props.size=120] - El tamaño (ancho y alto) del componente.
 * @param {number} [props.strokeWidth=10] - El grosor del trazo del círculo.
 * @param {string} [props.color='#4f46e5'] - El color del trazo de progreso.
 * @param {string} [props.label=''] - Una etiqueta opcional para mostrar debajo del porcentaje.
 * @returns {JSX.Element} El componente de progreso circular.
 */
const CircularProgress = ({
    percentage,
    size = 120,
    strokeWidth = 10,
    color = "#4f46e5",
    label = ""
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="circular-progress">
            <svg width={size} height={size} className="circular-progress__svg">
                <circle
                    className="circular-progress__bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="circular-progress__fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke={color}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <div className="circular-progress__content">
                <div className="circular-progress__percentage">{Math.round(percentage)}%</div>
                {label && <div className="circular-progress__label">{label}</div>}
            </div>
        </div>
    );
};

CircularProgress.propTypes = {
    /** El porcentaje de progreso a mostrar (0-100). */
    percentage: PropTypes.number.isRequired,
    /** El tamaño (ancho y alto) del componente. */
    size: PropTypes.number,
    /** El grosor del trazo del círculo. */
    strokeWidth: PropTypes.number,
    /** El color del trazo de progreso. */
    color: PropTypes.string,
    /** Una etiqueta opcional para mostrar debajo del porcentaje. */
    label: PropTypes.string
};

export default CircularProgress;
