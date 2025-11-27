import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/atoms/Logo.css";

// Será pasado a un logo de verdad más adelante

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/">MindCare</Link>
        </div>
    );
};

export default Logo;
