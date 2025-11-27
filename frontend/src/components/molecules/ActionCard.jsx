import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/ActionCard.css";

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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    navigateTo: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    icon: PropTypes.node
};

export default ActionCard;

