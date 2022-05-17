import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import { LOGIN, PASSWORD } from '../../constants';
import Button from '../Button/SubmitButton';

const Form = ({ submitFn, data, handleInputChange }) => {
  return (
    <form
      className="py-8 flex flex-col items-center"
      onSubmit={submitFn}
      autoComplete="off"
    >
      <Input
        name="login"
        label="Login"
        value={data.login}
        onChange={handleInputChange}
        validValue={LOGIN}
      />
      <Input
        name="password"
        label="Password"
        value={data.password}
        type="password"
        onChange={handleInputChange}
        validValue={PASSWORD}
      />
      <Button>log in</Button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  submitFn: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
