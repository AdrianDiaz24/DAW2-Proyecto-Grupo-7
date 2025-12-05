/**
 * @file Componente de carrusel.
 * @description Muestra una colección de tarjetas en un carrusel navegable.
 * @requires react
 * @requires prop-types
 * @requires ../atoms/Card
 * @requires ../../styles/molecules/Carousel.css
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "../atoms/Card";
import "../../styles/molecules/Carousel.css";

/**
 * @function Carousel
 * @description Renderiza un carrusel de tarjetas con controles de navegación.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.items - Una lista de objetos, cada uno con `title` y `description` para una tarjeta.
 * @returns {JSX.Element} El componente de carrusel.
 */
const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 2;

    /**
     * @function goToPrevious
     * @description Navega a la diapositiva anterior en el carrusel.
     */
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, items.length - itemsPerPage) : prevIndex - 1
        );
    };

    /**
     * @function goToNext
     * @description Navega a la siguiente diapositiva en el carrusel.
     */
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
    /** Una lista de objetos, cada uno con `title` y `description` para una tarjeta. */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            /** El título de la tarjeta. */
            title: PropTypes.string.isRequired,
            /** La descripción de la tarjeta. */
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Carousel;
