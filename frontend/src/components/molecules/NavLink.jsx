import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import "../../styles/molecules/NavLink.css";

const NavLink = ({ to, children, isLanding = false }) => {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);

    const baseItemSize = 0; // Sin ancho fijo
    const magnification = 1.25; // Escala de ampliación (25% - más pronunciada)
    const distance = 150;
    const spring = { mass: 0.05, stiffness: 400, damping: 15 };

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };
        return val - rect.x - (rect.width ?? 0) / 2;
    });

    const scale = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [1, magnification, 1]
    );

    const scaleSpring = useSpring(scale, spring);

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
    };

    if (!isLanding) {
        return (
            <Link to={to} style={{ textDecoration: "none" }}>
                {children}
            </Link>
        );
    }

    return (
        <motion.div
            ref={ref}
            className="nav-link-animated"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                scale: scaleSpring,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transformOrigin: "center",
            }}
        >
            <Link
                to={to}
                style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                }}
            >
                {children}
            </Link>
        </motion.div>
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isLanding: PropTypes.bool,
};

export default NavLink;

