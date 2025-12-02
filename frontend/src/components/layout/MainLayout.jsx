/**
 * @file Layout principal de la aplicación.
 * @description Proporciona la estructura principal de la página con barra de navegación, contenido principal y pie de página.
 * @requires react
 * @requires ../molecules/Navbar
 * @requires ../molecules/Footer
 * @requires ../../styles/Layout.css
 */
import React from "react";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import "../../styles/Layout.css";

/**
 * @function MainLayout
 * @description Renderiza el layout principal para las páginas de la aplicación.
 * @param {object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido principal de la página a renderizar.
 * @returns {JSX.Element} El componente del layout principal.
 */
const MainLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
