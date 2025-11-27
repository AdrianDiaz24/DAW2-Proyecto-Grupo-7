import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "../atoms/Card";
import "../../styles/molecules/Carousel.css";

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 2;

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, items.length - itemsPerPage) : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= items.length - itemsPerPage ? 0 : prevIndex + 1
        );
    };

    if (!items || items.length === 0) {
        return <div className="carousel carousel--empty">No hay artículos disponibles</div>;
    }

    const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="carousel">
            <button
                className="carousel__button carousel__button--prev"
                onClick={goToPrevious}
                aria-label="Anterior"
            >
                ‹
            </button>

            <div className="carousel__content">
                {visibleItems.map((item, index) => (
                    <Card
                        key={currentIndex + index}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>

            <button
                className="carousel__button carousel__button--next"
                onClick={goToNext}
                aria-label="Siguiente"
            >
                ›
            </button>

            <div className="carousel__indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel__indicator ${
                            index === currentIndex ? 'carousel__indicator--active' : ''
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Ir al artículo ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Carousel;

