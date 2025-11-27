import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Slider.css";

const Slider = ({
    label,
    value,
    onChange,
    min = 1,
    max = 10,
    step = 1,
    showValue = true
}) => {
    return (
        <div className="slider">
            <div className="slider__header">
                <label className="slider__label">{label}</label>
                {showValue && <span className="slider__value">{value}</span>}
            </div>
            <input
                type="range"
                className="slider__input"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
            <div className="slider__marks">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

Slider.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    showValue: PropTypes.bool
};

export default Slider;

