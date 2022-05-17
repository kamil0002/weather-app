import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IoIosLogOut } from 'react-icons/io';

import { LOGIN } from 'constants';
import LoginContext from 'context/loginContext';

const UserInformation = ({ intervalId }) => {
  const { handleUserLogout } = useContext(LoginContext);

  return (
    <div className="absolute top-3 right-7 flex items-center">
      <span className="text-gray-500 select-none">
        Logged in as
        <span className="font-medium text-sky-900"> {LOGIN}</span>
      </span>
      <span className="px-1.5 text-gray-400 font-sans select-none">|</span>
      <button
        className="flex items-center hover:bg-blue-400 hover:text-white mr-2 px-2 py-1 rounded-md font-medium transition-colors duration-150"
        onClick={() => handleUserLogout(intervalId)}
      >
        <span className="mr-2">Logout</span>
        <IoIosLogOut />
      </button>
    </div>
  );
};

export default UserInformation;

UserInformation.propTypes = {
  intervalId: PropTypes.number,
};
