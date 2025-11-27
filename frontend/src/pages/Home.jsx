import React from "react";
import { useAuthStore } from "../store/authStore";
import EmotionStats from "../components/molecules/EmotionStats";
import ActionCard from "../components/molecules/ActionCard";
import DiaryBanner from "../components/molecules/DiaryBanner";
import Carousel from "../components/molecules/Carousel";
import "../styles/Home.css";

const Home = () => {
    const { user } = useAuthStore();

    // Datos ficticios para las estadísticas emocionales (basados en el modelo registro)
    const emotionStats = [
        { emotion: "Feliz", percentage: 75 },
        { emotion: "Bien", percentage: 85 },
        { emotion: "Ansiedad", percentage: 30 },
        { emotion: "Promedio", percentage: 65 }
    ];

    // Datos ficticios para el carousel de artículos
    const articles = [
        {
            title: "5 Técnicas de Respiración para Reducir la Ansiedad",
            description: "Descubre cómo la respiración consciente puede ayudarte a manejar el estrés diario y mejorar tu bienestar emocional."
        },
        {
            title: "La Importancia del Sueño en la Salud Mental",
            description: "Conoce cómo un buen descanso nocturno influye directamente en tu estado de ánimo y capacidad cognitiva."
        },
        {
            title: "Mindfulness: Vivir el Presente",
            description: "Aprende técnicas de atención plena para conectar con el momento actual y reducir la rumiación mental."
        },
        {
            title: "Ejercicio Físico y Bienestar Emocional",
            description: "Explora la relación entre la actividad física regular y la mejora del estado de ánimo."
        },
        {
            title: "Alimentación Consciente para Tu Mente",
            description: "Descubre cómo lo que comes afecta tu salud mental y aprende a nutrir tu cerebro de forma óptima."
        }
    ];

    return (
        <div className="home-page">
            <div className="home-container">
                <header className="home-header">
                    <h1>¡Bienvenido, {user?.nombre || user?.email}!</h1>
                    <p className="home-subtitle">Tu espacio personal para cuidar tu bienestar mental</p>
                </header>

                {/* Estadísticas emocionales */}
                <section className="home-section">
                    <EmotionStats stats={emotionStats} />
                </section>

                {/* Action Card para Seguimiento */}
                <section className="home-section">
                    <ActionCard
                        title="Registra tu día"
                        description="¿Cómo te sientes hoy? Lleva un seguimiento diario de tus emociones, sueño, actividad física y más."
                        buttonText="Ir a Seguimiento"
                        navigateTo="/seguimiento"
                        variant="primary"
                        icon="📊"
                    />
                </section>

                {/* Banner del Diario */}
                <section className="home-section">
                    <DiaryBanner
                        title="Tu Diario Personal"
                        description="Escribe tus pensamientos, reflexiones y experiencias. Un espacio seguro para expresarte libremente."
                        buttonText="Escribir en mi Diario"
                        navigateTo="/diario"
                    />
                </section>

                {/* Carousel de Artículos */}
                <section className="home-section">
                    <div className="home-section-header">
                        <h2>Artículos Recomendados</h2>
                        <p>Contenido seleccionado para tu bienestar</p>
                    </div>
                    <Carousel items={articles} />
                </section>
            </div>
        </div>
    );
};

export default Home;
