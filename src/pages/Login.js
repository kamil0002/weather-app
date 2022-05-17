import React, { useState, useContext } from 'react';

import routes from 'routes';
import LoginContext from 'context/loginContext';

import LoginBgIcon from 'assets/images/loginbg-icon.svg';
import Form from 'components/Forms/LoginForm';
import { LOGIN, PASSWORD } from 'constants';
import { getLoginErrorMsg, controlAlertDisplay } from 'utils';
import Alert from 'components/Alert/Alert';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [formStatusMsg, setFormStatusMsg] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { handleUserLogin } = useContext(LoginContext);

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.login !== LOGIN || formData.password !== PASSWORD) {
      controlAlertDisplay(setFormStatusMsg, getLoginErrorMsg(formData), 2);

      return;
    }

    setFormStatusMsg('Logged in successfully!');

    setTimeout(() => {
      handleUserLogin();
      setFormStatusMsg(null);
      setRedirect(true);
    }, 2000);
  };

  if (redirect) {
    return <Navigate to={routes.weather} />;
  }

  return (
    <>
      {formStatusMsg && (
        <Alert
          type={formStatusMsg.includes('Please') ? 'error' : 'success'}
          errorMsg={formStatusMsg}
        />
      )}
      <img src={LoginBgIcon} className="w-1/2 md:w-1/5 max-w-xs mx-auto pt-8" />
      <div className="shadow-md bg-white mt-10 w-11/12 sm:w-1/2 max-w-lg mx-auto">
        <Form
          submitFn={handleFormSubmit}
          handleInputChange={handleInputChange}
          data={formData}
        />
      </div>
    </>
  );
};

export default Login;
