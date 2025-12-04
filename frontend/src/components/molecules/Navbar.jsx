import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

    // Items del menú para la versión móvil - Landing (sin autenticar)
    const menuItemsLanding = !user && isLanding ? [
        {
            label: "Iniciar Sesión",
            link: "/login",
        },
        {
            label: "Regístrate",
            link: "/register",
        },
    ] : [];

    // Items del menú para la versión móvil - Otras páginas (sin autenticar)
    const menuItemsNoAuth = !user && !isLanding ? [
        {
            label: "Inicio",
            link: "/",
        },
        {
            label: "Login",
            link: "/login",
        },
        {
            label: "Register",
            link: "/register",
        },
    ] : [];

    // Items del menú para la versión móvil - Autenticado
    const menuItemsAuth = user ? [
        {
            label: "Seguimiento",
            link: "/seguimiento",
        },
        {
            label: "Diario",
            link: "/diario",
        },
        {
            label: "Artículos",
            link: "/articulos",
        },
        {
            label: "Perfil",
            link: "/perfil",
        },
    ] : [];

    // Determinar qué items mostrar en móvil
    const menuItems = user ? menuItemsAuth : (isLanding ? menuItemsLanding : menuItemsNoAuth);

    return (
        <>
            {/* StaggeredMenu para móviles en todas las páginas */}
            {isMobile && (
                <StaggeredMenu
                    items={menuItems}
                    position="right"
                    menuButtonColor="#4A2CA5"
                    openMenuButtonColor="#4A2CA5"
                />
            )}

            <nav className={`navbar ${isLanding ? "navbar--landing" : ""}`}>
                <div className="navbar__logo">
                    <NavLink to="/home" isLanding={false} isMobile={isMobile}>
                        MindCare
                    </NavLink>
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
                    {!user && !isLanding && !isMobile && (
                        <>
                            <li>
                                <NavLink to="/" isLanding={false} isMobile={isMobile}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" isLanding={false} isMobile={isMobile}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" isLanding={false} isMobile={isMobile}>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Links cuando el usuario SÍ está autenticado (sin Home ni Logout) */}
                    {user && !isMobile && (
                        <>
                            <li>
                                <NavLink to="/seguimiento" isLanding={false} isMobile={isMobile}>
                                    Seguimiento
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/diario" isLanding={false} isMobile={isMobile}>
                                    Diario
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/articulos" isLanding={false} isMobile={isMobile}>
                                    Artículos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/perfil" isLanding={false} isMobile={isMobile}>
                                    Perfil
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
