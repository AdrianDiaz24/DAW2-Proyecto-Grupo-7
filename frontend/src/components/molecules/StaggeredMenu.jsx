import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import "../../styles/molecules/StaggeredMenu.css";

const StaggeredMenu = ({
    items = [],
    position = "right",
    menuButtonColor = "#4A2CA5",
    openMenuButtonColor = "#4A2CA5",
    accentColor = "#D4DBFF",
    displayItemNumbering = false,
    onMenuOpen = () => {},
    onMenuClose = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            onMenuOpen();
        } else {
            onMenuClose();
        }
    };

    const handleItemClick = (callback) => {
        setIsOpen(false);
        if (callback) callback();
    };

    // Variantes para la animación del botón
    const buttonVariants = {
        closed: {
            rotate: 0,
        },
        open: {
            rotate: 45,
        },
    };

    // Variantes para el menú contenedor
    const menuVariants = {
        closed: {
            opacity: 0,
            pointerEvents: "none",
        },
        open: {
            opacity: 1,
            pointerEvents: "auto",
        },
    };

    // Variantes para cada item del menú (staggered)
    const itemVariants = {
        closed: {
            opacity: 0,
            x: position === "right" ? 50 : -50,
        },
        open: (index) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
        exit: {
            opacity: 0,
            x: position === "right" ? 50 : -50,
        },
    };

    return (
        <div className={`staggered-menu staggered-menu--${position}`}>
            {/* Botón de hamburguesa */}
            <motion.button
                className="staggered-menu__button"
                onClick={toggleMenu}
                variants={buttonVariants}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                style={{ color: isOpen ? openMenuButtonColor : menuButtonColor }}
            >
                <span className="staggered-menu__icon">M</span>
            </motion.button>

            {/* Fondo oscuro de overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="staggered-menu__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            {/* Menú desplegable */}
            <motion.div
                className="staggered-menu__menu"
                variants={menuVariants}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
            >
                <div className="staggered-menu__content">
                    {/* Items del menú */}
                    <ul className="staggered-menu__list">
                        <AnimatePresence>
                            {isOpen &&
                                items.map((item, index) => (
                                    <motion.li
                                        key={item.link || index}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="exit"
                                        className="staggered-menu__item"
                                    >
                                        <a
                                            href={item.link}
                                            className="staggered-menu__link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleItemClick(() => {
                                                    if (item.onClick) {
                                                        item.onClick();
                                                    } else if (item.link.startsWith("http")) {
                                                        window.open(item.link, "_blank");
                                                    }
                                                });
                                            }}
                                        >
                                            {displayItemNumbering && (
                                                <span className="staggered-menu__number">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            )}
                                            <span className="staggered-menu__label">
                                                {item.label}
                                            </span>
                                        </a>
                                    </motion.li>
                                ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

StaggeredMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            onClick: PropTypes.func,
        })
    ),
    position: PropTypes.oneOf(["left", "right"]),
    menuButtonColor: PropTypes.string,
    openMenuButtonColor: PropTypes.string,
    accentColor: PropTypes.string,
    displayItemNumbering: PropTypes.bool,
    onMenuOpen: PropTypes.func,
    onMenuClose: PropTypes.func,
};

export default StaggeredMenu;

