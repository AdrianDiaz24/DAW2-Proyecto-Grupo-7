/**
 * @file Página de Aterrizaje (Landing Page).
 * @description La página principal que ven los usuarios no autenticados.
 * @requires react
 * @requires ../components/organisms/LandingHero
 * @requires ../styles/pages/Landing.css
 */
// src/pages/Landing.jsx
import React from "react";
import LandingHero from "../components/organisms/LandingHero";
import "../styles/pages/Landing.css";

const Landing = () => {
    return (
        <div className="landing-page">
            <LandingHero />
        </div>
    );
};

export default Landing;
