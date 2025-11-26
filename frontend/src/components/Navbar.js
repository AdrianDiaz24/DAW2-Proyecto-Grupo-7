import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const { user, logout } = useAuthStore();

    return (
        <nav>
            <Link to="/">Landing</Link>
            {isAuthenticated && <Link to="/home">Home</Link>}
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {isAuthenticated && <button onClick={logout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
