import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Input = ({
  onChange,
  value,
  name,
  type,
  label,
  validValue,
  placeholder,
  classes,
}) => {
  return (
    <div className="mt-4">
      <ReactTooltip />
      <label htmlFor={name} className="flex items-center">
        {label}
      </label>

      <input
        autoComplete="off"
        onChange={onChange}
        value={value}
        className={`${classes} transition-all duration-200 py-1.5 mt-1  max-w-xs outline-none px-1.5 rounded-sm border focus:outline-none focus:border ${
          validValue === value
            ? 'focus:border-green-600 border-green-600'
            : 'focus:border-yellow-600 border-gray-300'
        }`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder || ''}
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validValue: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};
