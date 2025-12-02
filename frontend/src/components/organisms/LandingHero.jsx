/**
 * @file Componente Hero para la página de aterrizaje.
 * @description Combina la sección Hero con los botones de autenticación para la página principal.
 * @requires react
 * @requires ../molecules/HeroSection
 * @requires ../molecules/AuthButtons
 * @requires ../../styles/organisms/LandingHero.css
 */
import React from "react";
import HeroSection from "../molecules/HeroSection";
import AuthButtons from "../molecules/AuthButtons";
import "../../styles/organisms/LandingHero.css";

/**
 * @function LandingHero
 * @description Renderiza la sección principal de la página de aterrizaje.
 * @returns {JSX.Element} El componente Hero de la página de aterrizaje.
 */
const LandingHero = () => {
    return (
        <div className="landing-hero">
            <HeroSection
                title="Cuida tu bienestar mental"
                description="MindCare te ayuda a hacer seguimiento de tu salud mental, llevar un diario y acceder a recursos de apoyo. Tu espacio seguro para el bienestar emocional."
            />
            <AuthButtons />
        </div>
    );
};

export default LandingHero;
