import React from 'react';
import PropTypes from 'prop-types';
import { GiMagnifyingGlass } from 'react-icons/gi';

import Button from '../Button/SubmitButton';
import Input from '../Input/Input';

const AddCityForm = ({
  submitFn,
  inputValue,
  handleInputChange,
  chipListForm,
}) => {
  return (
    <form
      className={`flex items-center ${
        chipListForm ? 'py-8 flex-col' : 'justify-center lg:justify-start'
      } `}
      onSubmit={submitFn}
    >
      <div className="flex">
        <div className="relative">
          <GiMagnifyingGlass className="hidden sm:block absolute transform mt-2.5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 left-2.5" />

          <Input
            value={inputValue}
            onChange={handleInputChange}
            name="city"
            label=""
            placeholder="Add a city to your list"
            classes={`${
              chipListForm
                ? 'w-64'
                : 'w-40 sm:w-auto sm:w-64 text-xs sm:text-base'
            } pl-2 sm:pl-9`}
          />
        </div>
      </div>
      <Button classes={`${chipListForm ? '' : 'bg-blue-500 ml-7'}`}>add</Button>
    </form>
  );
};

export default AddCityForm;

AddCityForm.propTypes = {
  submitFn: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  chipListForm: PropTypes.bool,
};

AddCityForm.defaultProps = {
  chipListForm: false,
};
