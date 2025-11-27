import React from "react";
import Navbar from "../molecules/Navbar"; // Ajusta según tu estructura
import "../../styles/layout.css"; // CSS por componente

const MainLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <header>
                <Navbar />
            </header>
            <main>
                {children} {/* Contenido variable por página */}
            </main>
            <footer>
                <p>MindCare © {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default MainLayout;
