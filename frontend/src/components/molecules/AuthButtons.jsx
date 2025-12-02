/**
 * @file Componente de botones de autenticación.
 * @description Muestra los botones de "Registrarse" e "Iniciar sesión".
 * @requires react
 * @requires react-router-dom
 * @requires ../atoms/Button
 * @requires ../../styles/molecules/AuthButtons.css
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/AuthButtons.css";

/**
 * @function AuthButtons
 * @description Renderiza los botones para navegar a las páginas de registro e inicio de sesión.
 * @returns {JSX.Element} El componente de botones de autenticación.
 */
const AuthButtons = () => {
    const navigate = useNavigate();

    /**
     * @function handleRegister
     * @description Navega a la página de registro.
     */
    const handleRegister = () => {
        navigate('/register');
    };

    /**
     * @function handleLogin
     * @description Navega a la página de inicio de sesión.
     */
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="auth-buttons">
            <Button
                variant="primary"
                size="large"
                onClick={handleRegister}
            >
                Registrarse
            </Button>
            <Button
                variant="outline"
                size="large"
                onClick={handleLogin}
            >
                Iniciar sesión
            </Button>
        </div>
    );
};

export default AuthButtons;
