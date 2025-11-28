import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/atoms/Textarea.css';

const Textarea = ({
    value,
    onChange,
    onBlur,
    placeholder,
    name,
    disabled = false,
    rows = 4,
    maxLength,
    className = '',
    error
}) => {
    return (
        <div className={`textarea-wrapper ${className}`}>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`textarea ${error ? 'textarea--error' : ''} ${disabled ? 'textarea--disabled' : ''}`}
            />
            {maxLength && value && (
                <div className="textarea__counter">
                    {value.length} / {maxLength}
                </div>
            )}
            {error && <span className="textarea__error">{error}</span>}
        </div>
    );
};

Textarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    maxLength: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.string
};

export default Textarea;

