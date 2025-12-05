/**
 * @file Componente de slider reutilizable.
 * @description Un componente de input de tipo "range" con etiqueta, valor y marcas.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Slider.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Slider.css";

/**
 * @function Slider
 * @description Renderiza un control deslizante (slider) para seleccionar un valor dentro de un rango.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta que se mostrará encima del slider.
 * @param {number} props.value - El valor actual del slider.
 * @param {function} props.onChange - Función que se ejecuta cuando cambia el valor del slider.
 * @param {number} [props.min=1] - El valor mínimo del slider.
 * @param {number} [props.max=10] - El valor máximo del slider.
 * @param {number} [props.step=1] - El incremento entre los valores del slider.
 * @param {boolean} [props.showValue=true] - Si es `true`, muestra el valor actual junto a la etiqueta.
 * @returns {JSX.Element} El componente de slider.
 */
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
    /** La etiqueta que se mostrará encima del slider. */
    label: PropTypes.string.isRequired,
    /** El valor actual del slider. */
    value: PropTypes.number.isRequired,
    /** Función que se ejecuta cuando cambia el valor del slider. */
    onChange: PropTypes.func.isRequired,
    /** El valor mínimo del slider. */
    min: PropTypes.number,
    /** El valor máximo del slider. */
    max: PropTypes.number,
    /** El incremento entre los valores del slider. */
    step: PropTypes.number,
    /** Si es `true`, muestra el valor actual junto a la etiqueta. */
    showValue: PropTypes.bool
};

export default Slider;
