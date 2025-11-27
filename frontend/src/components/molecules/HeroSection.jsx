import React from "react";
import PropTypes from "prop-types";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import "../../styles/molecules/HeroSection.css";

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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default HeroSection;

