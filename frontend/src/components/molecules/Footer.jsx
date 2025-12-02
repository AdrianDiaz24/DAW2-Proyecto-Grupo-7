/**
 * @file Componente del pie de página.
 * @description Muestra el pie de página de la aplicación con enlaces de navegación, legales y redes sociales.
 * @requires react
 * @requires react-router-dom
 * @requires ../../styles/molecules/Footer.css
 */
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/molecules/Footer.css";

/**
 * @function Footer
 * @description Renderiza el pie de página de la aplicación.
 * @returns {JSX.Element} El componente del pie de página.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>MindCare</h4>
                    <p>Tu espacio seguro para el bienestar emocional</p>
                </div>

                <div className="footer-section">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/login">Iniciar sesión</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><Link to="/privacidad">Política de Privacidad</Link></li>
                        <li><Link to="/terminos">Términos de Uso</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MindCare. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
