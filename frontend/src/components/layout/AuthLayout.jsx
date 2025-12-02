/**
 * @file Layout para las páginas de autenticación.
 * @description Proporciona una estructura consistente para las páginas de login y registro.
 * @requires react
 * @requires ../atoms/Logo
 * @requires ../../styles/layout/AuthLayout.css
 */
import React from "react";
import Logo from "../atoms/Logo";
import "../../styles/layout/AuthLayout.css";

/**
 * @function AuthLayout
 * @description Renderiza un layout centrado para los formularios de autenticación.
 * @param {object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido a renderizar dentro del layout (e.g., el formulario de login o registro).
 * @returns {JSX.Element} El componente de layout de autenticación.
 */
const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-logo">
                    <Logo />
                </div>
                <div className="auth-content">
                    {children}
                </div>
                <div className="auth-footer">
                    <p>&copy; {new Date().getFullYear()} MindCare - Tu bienestar es nuestra prioridad</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
