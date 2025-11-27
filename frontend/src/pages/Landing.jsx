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
