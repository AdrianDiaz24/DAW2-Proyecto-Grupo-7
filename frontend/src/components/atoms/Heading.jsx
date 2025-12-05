/**
 * @file Componente de encabezado reutilizable.
 * @description Renderiza un elemento de encabezado (h1, h2, etc.) con estilos consistentes.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Heading.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Heading.css";

/**
 * @function Heading
 * @description Renderiza un componente de encabezado con un nivel y clases personalizables.
 * @param {object} props - Las propiedades del componente.
 * @param {number} [props.level=1] - El nivel del encabezado (1 para `<h1>`, 2 para `<h2>`, etc.).
 * @param {React.ReactNode} props.children - El contenido del encabezado.
 * @param {string} [props.className=''] - Clases CSS adicionales para aplicar al encabezado.
 * @returns {JSX.Element} El componente de encabezado.
 */
const Heading = ({
    level = 1,
    children,
    className = ''
}) => {
    const Tag = `h${level}`;
    const classNames = ['heading', `heading--h${level}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <Tag className={classNames}>
            {children}
        </Tag>
    );
};

Heading.propTypes = {
    /** El nivel del encabezado (1 para `<h1>`, 2 para `<h2>`, etc.). */
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    /** El contenido del encabezado. */
    children: PropTypes.node.isRequired,
    /** Clases CSS adicionales para aplicar al encabezado. */
    className: PropTypes.string
};

export default Heading;
