import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Button.css";

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    type = 'button'
}) => {
    const classNames = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full-width' : '',
        loading ? 'btn--loading' : ''
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classNames}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
        >
            {loading ? (
                <span className="btn__loader">
                    <span className="btn__spinner"></span>
                    Cargando...
                </span>
            ) : children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
