/**
 * @file Componente de área de texto reutilizable.
 * @description Un componente de textarea con contador de caracteres y manejo de errores.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Textarea.css
 */
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/atoms/Textarea.css';

/**
 * @function Textarea
 * @description Renderiza un campo de área de texto con funcionalidades adicionales.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.value - El valor del área de texto.
 * @param {function} props.onChange - Función que se ejecuta cuando cambia el valor.
 * @param {function} [props.onBlur] - Función que se ejecuta cuando el área de texto pierde el foco.
 * @param {string} [props.placeholder] - El texto de marcador de posición.
 * @param {string} [props.name] - El nombre del área de texto.
 * @param {boolean} [props.disabled=false] - Si es `true`, el área de texto está deshabilitada.
 * @param {number} [props.rows=4] - El número de filas visibles del área de texto.
 * @param {number} [props.maxLength] - El número máximo de caracteres permitidos.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor.
 * @param {string} [props.error] - Un mensaje de error para mostrar debajo.
 * @returns {JSX.Element} El componente de área de texto.
 */
const Textarea = ({
    value,
    onChange,
    onBlur,
    placeholder,
    name,
    disabled = false,
    rows = 4,
    maxLength,
    className = '',
    error
}) => {
    return (
        <div className={`textarea-wrapper ${className}`}>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`textarea ${error ? 'textarea--error' : ''} ${disabled ? 'textarea--disabled' : ''}`}
            />
            {maxLength && value && (
                <div className="textarea__counter">
                    {value.length} / {maxLength}
                </div>
            )}
            {error && <span className="textarea__error">{error}</span>}
        </div>
    );
};

Textarea.propTypes = {
    /** El valor del área de texto. */
    value: PropTypes.string,
    /** Función que se ejecuta cuando cambia el valor. */
    onChange: PropTypes.func.isRequired,
    /** Función que se ejecuta cuando el área de texto pierde el foco. */
    onBlur: PropTypes.func,
    /** El texto de marcador de posición. */
    placeholder: PropTypes.string,
    /** El nombre del área de texto. */
    name: PropTypes.string,
    /** Si es `true`, el área de texto está deshabilitada. */
    disabled: PropTypes.bool,
    /** El número de filas visibles del área de texto. */
    rows: PropTypes.number,
    /** El número máximo de caracteres permitidos. */
    maxLength: PropTypes.number,
    /** Clases CSS adicionales para el contenedor. */
    className: PropTypes.string,
    /** Un mensaje de error para mostrar debajo. */
    error: PropTypes.string
};

export default Textarea;
