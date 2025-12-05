/**
 * @file Componente de tarjeta de acción.
 * @description Muestra una tarjeta con título, descripción y un botón que navega a una ruta específica.
 * @requires react
 * @requires prop-types
 * @requires react-router-dom
 * @requires ../atoms/Button
 * @requires ../../styles/molecules/ActionCard.css
 */
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/ActionCard.css";

/**
 * @function ActionCard
 * @description Renderiza una tarjeta interactiva que redirige al usuario al hacer clic en un botón.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.title - El título de la tarjeta.
 * @param {string} props.description - La descripción de la tarjeta.
 * @param {string} props.buttonText - El texto del botón.
 * @param {string} props.navigateTo - La ruta a la que navegar al hacer clic en el botón.
 * @param {string} [props.variant='primary'] - La variante de estilo de la tarjeta y el botón.
 * @param {React.ReactNode} [props.icon] - Un icono opcional para mostrar en la tarjeta.
 * @returns {JSX.Element} El componente de tarjeta de acción.
 */
const ActionCard = ({
    title,
    description,
    buttonText,
    navigateTo,
    variant = "primary",
    icon
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo);
    };

    return (
        <div className={`action-card action-card--${variant}`}>
            <div className="action-card__content">
                <h3 className="action-card__title">{title}</h3>
                <p className="action-card__description">{description}</p>
            </div>
            <Button
                variant={variant}
                size="medium"
                onClick={handleClick}
            >
                {buttonText}
            </Button>
        </div>
    );
};

ActionCard.propTypes = {
    /** El título de la tarjeta. */
    title: PropTypes.string.isRequired,
    /** La descripción de la tarjeta. */
    description: PropTypes.string.isRequired,
    /** El texto del botón. */
    buttonText: PropTypes.string.isRequired,
    /** La ruta a la que navegar al hacer clic en el botón. */
    navigateTo: PropTypes.string.isRequired,
    /** La variante de estilo de la tarjeta y el botón. */
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    /** Un icono opcional para mostrar en la tarjeta. */
    icon: PropTypes.node
};

export default ActionCard;
