/**
 * @file Componente de la sección principal (Hero).
 * @description Muestra un título y una descripción prominentes, típicamente en la parte superior de una página.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Heading
 * @requires ../atoms/Text
 * @requires ../../styles/molecules/HeroSection.css
 */
import React from "react";
import PropTypes from "prop-types";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import "../../styles/molecules/HeroSection.css";

/**
 * @function HeroSection
 * @description Renderiza una sección de héroe con un título y una descripción.
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.title - El título principal de la sección.
 * @param {string} props.description - La descripción o subtítulo de la sección.
 * @returns {JSX.Element} El componente de la sección de héroe.
 */
const HeroSection = ({
    title,
    description
}) => {
    return (
        <div className="hero-section">
            <Heading level={1} className="hero-section__title">
                {title}
            </Heading>
            <Text variant="body" className="hero-section__description">
                {description}
            </Text>
        </div>
    );
};

HeroSection.propTypes = {
    /** El título principal de la sección. */
    title: PropTypes.string.isRequired,
    /** La descripción o subtítulo de la sección. */
    description: PropTypes.string.isRequired
};

export default HeroSection;
