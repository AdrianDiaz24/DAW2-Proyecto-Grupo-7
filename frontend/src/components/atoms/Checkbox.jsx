/**
 * @file Componente de checkbox reutilizable.
 * @description Un componente de checkbox con etiqueta y estado personalizable.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Checkbox.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Checkbox.css";

/**
 * @function Checkbox
 * @description Renderiza un input de tipo checkbox con una etiqueta.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta que se mostrará junto al checkbox.
 * @param {boolean} props.checked - Si es `true`, el checkbox estará marcado.
 * @param {function} props.onChange - Función que se ejecuta cuando cambia el estado del checkbox.
 * @param {string} [props.name] - El nombre del input del checkbox.
 * @param {boolean} [props.disabled=false] - Si es `true`, el checkbox estará deshabilitado.
 * @returns {JSX.Element} El componente de checkbox.
 */
const Checkbox = ({
    label,
    checked,
    onChange,
    name,
    disabled = false
}) => {
    return (
        <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
            <input
                type="checkbox"
                className="checkbox__input"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                name={name}
                disabled={disabled}
            />
            <span className="checkbox__checkmark"></span>
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

Checkbox.propTypes = {
    /** La etiqueta que se mostrará junto al checkbox. */
    label: PropTypes.string.isRequired,
    /** Si es `true`, el checkbox estará marcado. */
    checked: PropTypes.bool.isRequired,
    /** Función que se ejecuta cuando cambia el estado del checkbox. */
    onChange: PropTypes.func.isRequired,
    /** El nombre del input del checkbox. */
    name: PropTypes.string,
    /** Si es `true`, el checkbox estará deshabilitado. */
    disabled: PropTypes.bool
};

export default Checkbox;
