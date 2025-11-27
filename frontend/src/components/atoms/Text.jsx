import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Text.css";

const Text = ({
    children,
    variant = 'body',
    className = ''
}) => {
    const classNames = ['text', `text--${variant}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <p className={classNames}>
            {children}
        </p>
    );
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['body', 'subtitle', 'caption', 'small']),
    className: PropTypes.string
};

export default Text;

