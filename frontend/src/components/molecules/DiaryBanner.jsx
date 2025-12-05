/**
 * @file Componente de banner para el diario.
 * @description Muestra un banner con un título, descripción y un botón de llamada a la acción.
 * @requires react
 * @requires prop-types
 * @requires react-router-dom
 * @requires ../atoms/Button
 * @requires ../../styles/molecules/DiaryBanner.css
 */
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/DiaryBanner.css";

/**
 * @function DiaryBanner
 * @description Renderiza un banner promocional para la sección del diario.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.title - El título del banner.
 * @param {string} props.description - La descripción del banner.
 * @param {string} props.buttonText - El texto del botón.
 * @param {string} props.navigateTo - La ruta a la que navegar al hacer clic en el botón.
 * @returns {JSX.Element} El componente de banner del diario.
 */
const DiaryBanner = ({
    title,
    description,
    buttonText,
    navigateTo
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo);
    };

    return (
        <div className="diary-banner">
            <div className="diary-banner__content">
                <div className="diary-banner__text">
                    <h3 className="diary-banner__title">{title}</h3>
                    <p className="diary-banner__description">{description}</p>
                </div>
            </div>
            <Button
                variant="primary"
                size="large"
                onClick={handleClick}
            >
                {buttonText}
            </Button>
        </div>
    );
};

DiaryBanner.propTypes = {
    /** El título del banner. */
    title: PropTypes.string.isRequired,
    /** La descripción del banner. */
    description: PropTypes.string.isRequired,
    /** El texto del botón. */
    buttonText: PropTypes.string.isRequired,
    /** La ruta a la que navegar al hacer clic en el botón. */
    navigateTo: PropTypes.string.isRequired
};

export default DiaryBanner;
