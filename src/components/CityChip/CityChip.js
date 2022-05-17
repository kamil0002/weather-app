import React from 'react';
import PropTypes from 'prop-types';
import { IoIosRemoveCircle } from 'react-icons/io';

const CityChip = ({ handleChipDelete, children }) => {
  return (
    <div className="bg-white w-max px-2 md:px-4 py-1 mt-3 shadow-md rounded-sm flex items-center">
      <IoIosRemoveCircle
        onClick={handleChipDelete}
        className="text-gray-800 transform hover:scale-110 cursor-pointer transition-all duration-250 mr-2"
      />
      <span className="text-xs sm:text-sm">{children}</span>
    </div>
  );
};

export default CityChip;

CityChip.propTypes = {
  handleChipDelete: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
