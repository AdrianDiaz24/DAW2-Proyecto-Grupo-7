/**
 * @file Componente de estadísticas de emociones.
 * @description Muestra las estadísticas de emociones de los últimos 7 días usando gráficos de progreso circular.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/CircularProgress
 * @requires ../../styles/molecules/EmotionStats.css
 */
import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "../atoms/CircularProgress";
import "../../styles/molecules/EmotionStats.css";

/**
 * @function EmotionStats
 * @description Renderiza una cuadrícula de estadísticas de emociones.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.stats - Una lista de objetos de estadísticas, cada uno con `emotion` y `percentage`.
 * @returns {JSX.Element} El componente de estadísticas de emociones.
 */
const EmotionStats = ({ stats }) => {
    const emotionColors = {
        "Feliz": "#10b981",
        "Bien": "#22c55e",
        "Triste": "#3b82f6",
        "Ansiedad": "#f59e0b",
        "Rabia": "#ef4444",
        "Promedio": "#8b5cf6"
    };

    return (
        <div className="emotion-stats">
            <h3 className="emotion-stats__title">¿Cómo te has sentido?</h3>
            <p className="emotion-stats__subtitle">Últimos 7 días</p>
            <div className="emotion-stats__grid">
                {stats.map((stat, index) => (
                    <div key={index} className="emotion-stats__item">
                        <CircularProgress
                            percentage={stat.percentage}
                            size={100}
                            strokeWidth={8}
                            color={emotionColors[stat.emotion] || "#4f46e5"}
                            label={stat.emotion}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

EmotionStats.propTypes = {
    /** Una lista de objetos de estadísticas, cada uno con `emotion` y `percentage`. */
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            /** El nombre de la emoción. */
            emotion: PropTypes.string.isRequired,
            /** El porcentaje de la emoción. */
            percentage: PropTypes.number.isRequired
        })
    ).isRequired
};

export default EmotionStats;
