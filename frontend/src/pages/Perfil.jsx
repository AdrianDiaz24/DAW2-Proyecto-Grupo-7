import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Perfil.css";

const Perfil = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="perfil-page">
            <div className="perfil-container">
                <h1 className="perfil-title">Mi Perfil</h1>

                {user && (
                    <div className="perfil-info">
                        <div className="perfil-section">
                            <h2>Información Personal</h2>
                            <div className="info-group">
                                <label>Email:</label>
                                <p>{user.email || "No disponible"}</p>
                            </div>
                            {user.nombre && (
                                <div className="info-group">
                                    <label>Nombre:</label>
                                    <p>{user.nombre}</p>
                                </div>
                            )}
                        </div>

                        <div className="perfil-section">
                            <h2>Acciones</h2>
                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;

