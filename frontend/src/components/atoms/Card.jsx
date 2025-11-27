import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Card.css";

const Card = ({ title, description }) => {
    return (
        <div className="card">
            <h3 className="card__title">{title}</h3>
            <p className="card__description">{description}</p>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Card;

