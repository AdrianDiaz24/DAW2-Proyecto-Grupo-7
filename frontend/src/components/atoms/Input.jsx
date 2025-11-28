import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/atoms/Input.css';

const Input = ({
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    name,
    disabled = false,
    className = '',
    error,
    label,
    icon
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label htmlFor={name} className="input__label">
                    {label}
                </label>
            )}
            <div className="input-container">
                {icon && <span className="input__icon">{icon}</span>}
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''} ${icon ? 'input--with-icon' : ''}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="input__toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>
            {error && <span className="input__error">{error}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.node
};

export default Input;

