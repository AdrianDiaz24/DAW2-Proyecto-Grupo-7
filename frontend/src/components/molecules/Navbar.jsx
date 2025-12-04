import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
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
                <Link to={user ? "/home" : "/"}>{user ? "MindCare" : "MindCare"}</Link>
            </div>
            <ul className="navbar__links">
                {/* Links cuando el usuario NO está autenticado (Landing) */}
                {!user && isLanding && (
                    <>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/register">Regístrate</Link></li>
                    </>
                )}

                {/* Links cuando el usuario NO está autenticado (Otras páginas) */}
                {!user && !isLanding && (
                    <>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}

                {/* Links cuando el usuario SÍ está autenticado */}
                {user && <li><Link to="/home">Home</Link></li>}
                {user && <li><Link to="/seguimiento">Seguimiento</Link></li>}
                {user && <li><Link to="/diario">Diario</Link></li>}
                {user && <li><Link to="/articulos">Artículos</Link></li>}
                {user && <li><Link to="/perfil">Perfil</Link></li>}
                {user && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
