/**
 * @file Componente de botón reutilizable.
 * @description Un componente de botón versátil con diferentes variantes, tamaños y estados.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Button.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Button.css";

/**
 * @function Button
 * @description Renderiza un elemento de botón con estilos y funcionalidades personalizables.
 * @param {object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido del botón.
 * @param {function} [props.onClick] - Función a ejecutar cuando se hace clic en el botón.
 * @param {string} [props.variant='primary'] - La variante de estilo del botón ('primary', 'secondary', 'outline').
 * @param {string} [props.size='medium'] - El tamaño del botón ('small', 'medium', 'large').
 * @param {boolean} [props.fullWidth=false] - Si es `true`, el botón ocupa todo el ancho disponible.
 * @param {boolean} [props.disabled=false] - Si es `true`, el botón está deshabilitado.
 * @param {boolean} [props.loading=false] - Si es `true`, muestra un indicador de carga.
 * @param {string} [props.type='button'] - El tipo de botón ('button', 'submit', 'reset').
 * @returns {JSX.Element} El componente de botón.
 */
const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    type = 'button'
}) => {
    const classNames = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full-width' : '',
        loading ? 'btn--loading' : ''
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
        >
            {loading ? (
                <span className="btn__loader">
                    <span className="btn__spinner"></span>
                    Cargando...
                </span>
            ) : children}
        </button>
    );
};

Button.propTypes = {
    /** El contenido del botón. */
    children: PropTypes.node.isRequired,
    /** Función a ejecutar cuando se hace clic en el botón. */
    onClick: PropTypes.func,
    /** La variante de estilo del botón. */
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    /** El tamaño del botón. */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** Si es `true`, el botón ocupa todo el ancho disponible. */
    fullWidth: PropTypes.bool,
    /** Si es `true`, el botón está deshabilitado. */
    disabled: PropTypes.bool,
    /** Si es `true`, muestra un indicador de carga. */
    loading: PropTypes.bool,
    /** El tipo de botón. */
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
