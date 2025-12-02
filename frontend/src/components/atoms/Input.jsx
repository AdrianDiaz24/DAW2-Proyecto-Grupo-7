/**
 * @file Componente de input reutilizable.
 * @description Un componente de input versátil con etiqueta, icono, manejo de errores y visibilidad de contraseña.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Input.css
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/atoms/Input.css';

/**
 * @function Input
 * @description Renderiza un campo de entrada con varias funcionalidades.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.type='text'] - El tipo de input (e.g., 'text', 'password', 'email').
 * @param {string} props.value - El valor del input.
 * @param {function} props.onChange - Función que se ejecuta cuando cambia el valor del input.
 * @param {function} [props.onBlur] - Función que se ejecuta cuando el input pierde el foco.
 * @param {string} [props.placeholder] - El texto de marcador de posición del input.
 * @param {string} [props.name] - El nombre del input.
 * @param {boolean} [props.disabled=false] - Si es `true`, el input está deshabilitado.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor del input.
 * @param {string} [props.error] - Un mensaje de error para mostrar debajo del input.
 * @param {string} [props.label] - La etiqueta para mostrar encima del input.
 * @param {React.ReactNode} [props.icon] - Un icono para mostrar dentro del input.
 * @returns {JSX.Element} El componente de input.
 */
const Input = ({
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    name,
    disabled = false,
    className = '',
    error,
    label,
    icon
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label htmlFor={name} className="input__label">
                    {label}
                </label>
            )}
            <div className="input-container">
                {icon && <span className="input__icon">{icon}</span>}
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''} ${icon ? 'input--with-icon' : ''}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="input__toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>
            {error && <span className="input__error">{error}</span>}
        </div>
    );
};

Input.propTypes = {
    /** El tipo de input. */
    type: PropTypes.string,
    /** El valor del input. */
    value: PropTypes.string,
    /** Función que se ejecuta cuando cambia el valor del input. */
    onChange: PropTypes.func.isRequired,
    /** Función que se ejecuta cuando el input pierde el foco. */
    onBlur: PropTypes.func,
    /** El texto de marcador de posición del input. */
    placeholder: PropTypes.string,
    /** El nombre del input. */
    name: PropTypes.string,
    /** Si es `true`, el input está deshabilitado. */
    disabled: PropTypes.bool,
    /** Clases CSS adicionales para el contenedor del input. */
    className: PropTypes.string,
    /** Un mensaje de error para mostrar debajo del input. */
    error: PropTypes.string,
    /** La etiqueta para mostrar encima del input. */
    label: PropTypes.string,
    /** Un icono para mostrar dentro del input. */
    icon: PropTypes.node
};

export default Input;
