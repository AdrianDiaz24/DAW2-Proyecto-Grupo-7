import React from "react";
import HeroSection from "../molecules/HeroSection";
import AuthButtons from "../molecules/AuthButtons";
import "../../styles/organisms/LandingHero.css";

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

