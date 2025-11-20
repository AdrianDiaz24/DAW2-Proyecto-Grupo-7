// src/pages/Landing.js
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="container">
            <h1>Bienvenido a nuestra aplicación</h1>
            <p>Regístrate o inicia sesión para acceder al contenido.</p>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link to="/register" style={{ marginRight: "15px" }}>Registrarse</Link>
                <Link to="/login">Iniciar sesión</Link>
            </div>
        </div>
    );
};

export default Landing;
