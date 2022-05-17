import React from 'react';
import PropTypes from 'prop-types';
import { BiErrorCircle } from 'react-icons/bi';

const Alert = ({ errorMsg, type }) => {
  return (
    <div
      className={`z-20 duration-300 rounded-md border ${
        type === 'success'
          ? 'border-green-500  bg-green-300'
          : 'border-red-500 bg-red-300 '
      } max-w-sm fixed top-2 md:top-10 left-1/2 transform -translate-x-1/2 w-max px-2.5 py-1 flex items-center justify-center`}
    >
      <BiErrorCircle
        className={`${
          type === 'success' ? 'text-green-900' : 'text-red-900'
        } text-lg`}
      />
      <span
        className={`${
          type === 'success' ? 'text-green-900' : 'text-red-900'
        } ml-3 block text-center`}
      >
        {errorMsg}
      </span>
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'success',
};
