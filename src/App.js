import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './routes';
import LoginContext from 'context/loginContext';
import { LoginPage, WeatherPage } from 'pages';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleUserLogin = () => {
    setUserLoggedIn(true);
  };

  const handleUserLogout = (APICallInterval) => {
    setUserLoggedIn(false);
    clearInterval(APICallInterval);
  };

  const context = {
    userLoggedIn,
    handleUserLogin,
    handleUserLogout,
  };

  return (
    <LoginContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.weather} element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
