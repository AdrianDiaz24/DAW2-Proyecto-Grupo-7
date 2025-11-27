import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Heading.css";

const Heading = ({
    level = 1,
    children,
    className = ''
}) => {
    const Tag = `h${level}`;
    const classNames = ['heading', `heading--h${level}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <Tag className={classNames}>
            {children}
        </Tag>
    );
};

Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Heading;

