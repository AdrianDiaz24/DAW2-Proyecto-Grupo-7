// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <nav>
            <Link to="/">Landing</Link>
            {isAuthenticated && <Link to="/home">Home</Link>}
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
