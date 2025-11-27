import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "../atoms/CircularProgress";
import "../../styles/molecules/EmotionStats.css";

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
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            emotion: PropTypes.string.isRequired,
            percentage: PropTypes.number.isRequired
        })
    ).isRequired
};

export default EmotionStats;

