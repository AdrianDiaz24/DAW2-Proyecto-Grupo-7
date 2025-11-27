import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/molecules/AuthButtons.css";

const AuthButtons = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

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

