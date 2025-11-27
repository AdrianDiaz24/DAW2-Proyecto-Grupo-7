import React from "react";
import { useNavigate } from "react-router-dom";
import EmotionChart from "../molecules/EmotionChart";
import ArticlesCarousel from "../molecules/ArticlesCarousel";
import Button from "../atoms/Button";
import "../../styles/DashboardMain.css";

const HomeContent = () => {
    const navigate = useNavigate();

    // Simulación de datos (más adelante lo traerás del backend)
    const trackerData = [
        { fecha: "Lun", animo: 3 },
        { fecha: "Mar", animo: 4 },
        { fecha: "Mié", animo: 2 }
    ];

    return (
        <main className="dashboard-main">
            <EmotionChart data={trackerData} />

            <div className="action-buttons">
                <Button onClick={() => navigate("/tracker")}>
                    Trackear mi día
                </Button>

                <Button onClick={() => navigate("/diario-libre")}>
                    Ir al diario libre
                </Button>
            </div>

            <h2>Artículos de salud mental</h2>
            <div className="article-carousel">
                <ArticlesCarousel />
                <ArticlesCarousel />
                <ArticlesCarousel />
            </div>
        </main>
    );
};

export default HomeContent;
