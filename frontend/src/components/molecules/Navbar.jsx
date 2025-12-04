import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import NavLink from "./NavLink";
import StaggeredMenu from "./StaggeredMenu";
import "../../styles/molecules/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const isLanding = location.pathname === "/";
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Items del menú para la versión móvil
    const menuItems = !user && isLanding ? [
        {
            label: "Iniciar Sesión",
            link: "/login",
            onClick: () => navigate("/login"),
        },
        {
            label: "Regístrate",
            link: "/register",
            onClick: () => navigate("/register"),
        },
    ] : [];

    return (
        <>
            {/* StaggeredMenu para móviles en landing */}
            {isMobile && isLanding && (
                <StaggeredMenu
                    items={menuItems}
                    position="right"
                    menuButtonColor="#4A2CA5"
                    openMenuButtonColor="#4A2CA5"
                    accentColor="#D4DBFF"
                    displayItemNumbering={false}
                    onMenuOpen={() => console.log("Menu abierto")}
                    onMenuClose={() => console.log("Menu cerrado")}
                />
            )}

            <nav className={`navbar ${isLanding ? "navbar--landing" : ""}`}>
                <div className="navbar__logo">
                    <Link to={user ? "/home" : "/"} style={{ textDecoration: "none" }}>
                        {user ? "MindCare" : "MindCare"}
                    </Link>
                </div>

                <ul className="navbar__links">
                    {/* Links cuando el usuario NO está autenticado (Landing) - Desktop */}
                    {!user && isLanding && !isMobile && (
                        <>
                            <li>
                                <NavLink to="/login" isLanding={true} isMobile={isMobile}>
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" isLanding={true} isMobile={isMobile}>
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
        </>
    );
};

export default Navbar;
