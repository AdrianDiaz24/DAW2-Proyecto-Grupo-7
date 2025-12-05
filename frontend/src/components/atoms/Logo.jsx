/**
 * @file Componente del logo.
 * @description Muestra el logo de la aplicación y enlaza a la página de inicio.
 * @requires react
 * @requires react-router-dom
 * @requires ../../styles/atoms/Logo.css
 */
import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/atoms/Logo.css";

// Será pasado a un logo de verdad más adelante

/**
 * @function Logo
 * @description Renderiza el logo de la aplicación como un enlace a la página principal.
 * @returns {JSX.Element} El componente del logo.
 */
const Logo = () => {
    return (
        <div className="logo">
            <Link to="/">MindCare</Link>
        </div>
    );
};

export default Logo;
