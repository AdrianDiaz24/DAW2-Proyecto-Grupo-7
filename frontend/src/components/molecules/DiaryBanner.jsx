import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/DiaryBanner.css";

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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    navigateTo: PropTypes.string.isRequired
};

export default DiaryBanner;

