/**
 * @file Componente de texto reutilizable.
 * @description Renderiza un elemento de párrafo con diferentes variantes de estilo.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Text.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Text.css";

/**
 * @function Text
 * @description Renderiza un componente de texto con variantes y clases personalizables.
 * @param {object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido del texto.
 * @param {string} [props.variant='body'] - La variante de estilo del texto ('body', 'subtitle', 'caption', 'small').
 * @param {string} [props.className=''] - Clases CSS adicionales para aplicar al texto.
 * @returns {JSX.Element} El componente de texto.
 */
const Text = ({
    children,
    variant = 'body',
    className = ''
}) => {
    const classNames = ['text', `text--${variant}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <p className={classNames}>
            {children}
        </p>
    );
};

Text.propTypes = {
    /** El contenido del texto. */
    children: PropTypes.node.isRequired,
    /** La variante de estilo del texto. */
    variant: PropTypes.oneOf(['body', 'subtitle', 'caption', 'small']),
    /** Clases CSS adicionales para aplicar al texto. */
    className: PropTypes.string
};

export default Text;
