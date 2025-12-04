import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import NavLink from "./NavLink";
import "../../styles/molecules/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const isLanding = location.pathname === "/";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className={`navbar ${isLanding ? "navbar--landing" : ""}`}>
            <div className="navbar__logo">
                <Link to={user ? "/home" : "/"} style={{ textDecoration: "none" }}>
                    {user ? "MindCare" : "MindCare"}
                </Link>
            </div>
            <ul className="navbar__links">
                {/* Links cuando el usuario NO está autenticado (Landing) */}
                {!user && isLanding && (
                    <>
                        <li>
                            <NavLink to="/login" isLanding={true}>
                                Iniciar Sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" isLanding={true}>
                                Regístrate
                            </NavLink>
                        </li>
                    </>
                )}

                {/* Links cuando el usuario NO está autenticado (Otras páginas) */}
                {!user && !isLanding && (
                    <>
                        <li>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" style={{ textDecoration: "none" }}>
                                Register
                            </Link>
                        </li>
                    </>
                )}

                {/* Links cuando el usuario SÍ está autenticado */}
                {user && (
                    <>
                        <li>
                            <Link to="/home" style={{ textDecoration: "none" }}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/seguimiento" style={{ textDecoration: "none" }}>
                                Seguimiento
                            </Link>
                        </li>
                        <li>
                            <Link to="/diario" style={{ textDecoration: "none" }}>
                                Diario
                            </Link>
                        </li>
                        <li>
                            <Link to="/articulos" style={{ textDecoration: "none" }}>
                                Artículos
                            </Link>
                        </li>
                        <li>
                            <Link to="/perfil" style={{ textDecoration: "none" }}>
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{ textDecoration: "none" }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
