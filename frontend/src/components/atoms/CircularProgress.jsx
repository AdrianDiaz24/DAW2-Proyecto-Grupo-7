import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/CircularProgress.css";

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
    percentage: PropTypes.number.isRequired,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string
};

export default CircularProgress;

