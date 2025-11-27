import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "../../styles/molecules/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to={user ? "/home" : "/"}>{user ? "MindCare" : "MindCare"}</Link>
            </div>
            <ul className="nav-links">
                {/* Links cuando el usuario NO está autenticado */}
                {!user && <li><Link to="/">Inicio</Link></li>}
                {!user && <li><Link to="/login">Login</Link></li>}
                {!user && <li><Link to="/register">Register</Link></li>}

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
