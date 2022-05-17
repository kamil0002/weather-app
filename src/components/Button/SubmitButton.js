import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, classes }) => {
  return (
    <button
      className={`uppercase block font-bold text-white ${
        classes ? classes : 'ring-green-400 bg-green-500'
      } hover:ring-offset-2 hover:ring-2 py-2 px-7 mt-5 rounded-md  transition duration-150`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.string,
};
