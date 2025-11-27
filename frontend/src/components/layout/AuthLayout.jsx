import React from "react";
import Logo from "../atoms/Logo";
import "../../styles/layout/AuthLayout.css";

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

