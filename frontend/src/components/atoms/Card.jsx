/**
 * @file Componente de tarjeta simple.
 * @description Muestra un título y una descripción en un contenedor con estilo de tarjeta.
 * @requires react
 * @requires prop-types
 * @requires ../../styles/atoms/Card.css
 */
import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Card.css";

/**
 * @function Card
 * @description Renderiza un componente de tarjeta con un título y una descripción.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.title - El título que se mostrará en la tarjeta.
 * @param {string} props.description - La descripción que se mostrará en la tarjeta.
 * @returns {JSX.Element} El componente de tarjeta.
 */
const Card = ({ title, description }) => {
    return (
        <div className="card">
            <h3 className="card__title">{title}</h3>
            <p className="card__description">{description}</p>
        </div>
    );
};

Card.propTypes = {
    /** El título de la tarjeta. */
    title: PropTypes.string.isRequired,
    /** La descripción de la tarjeta. */
    description: PropTypes.string.isRequired
};

export default Card;
