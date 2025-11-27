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
            <div className="logo">MindCare</div>
            <ul className="nav-links">
                {user && <li><Link to="/diario">Diario</Link></li>}
                {user && <li><Link to="/tracker">Tracker</Link></li>}
                {user && <li><Link to="/articulos">Artículos</Link></li>}
                {user && <li><Link to="/perfil">Perfil</Link></li>}
                {!user && <li><Link to="/login">Login</Link></li>}
                {!user && <li><Link to="/register">Register</Link></li>}
                {user && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
