import React from "react";
import PropTypes from "prop-types";
import "../../styles/atoms/Checkbox.css";

const Checkbox = ({
    label,
    checked,
    onChange,
    name,
    disabled = false
}) => {
    return (
        <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
            <input
                type="checkbox"
                className="checkbox__input"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                name={name}
                disabled={disabled}
            />
            <span className="checkbox__checkmark"></span>
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    disabled: PropTypes.bool
};

export default Checkbox;

