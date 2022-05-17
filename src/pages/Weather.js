import React, { useEffect, useState, useContext, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import routes from 'routes';
import LoginContext from 'context/loginContext';

import Form from 'components/Forms/AddCityForm';
import CityChip from 'components/CityChip/CityChip';
import Alert from 'components/Alert/Alert';
import Spinner from 'components/Spinner/Spinner';
import LineChart from 'components/LineChart/LineChart';
import Table from 'components/Table/Table';
import BarChart from 'components/BarChart/BarChart';
import UserInformation from 'components/UserInformation/UserInformation';

import {
  apiRequests,
  isCityValid,
  controlAlertDisplay,
  formatHourlyData,
  attachWeatherToCities,
  loadJson,
} from 'utils';

import { API_REFRESH_RATE } from 'constants';

const Weather = () => {
  const [searchedCity, setSearchedCity] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [observedCities, setObservedCities] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [cityWasAdded, setCityWasAdded] = useState(false);
  const [hourlyData, setHourlyData] = useState(null);
  const [fetchingFromFile, setFetchingFromFile] = useState(false);
  const [cityDeleted, setCityDeleted] = useState(false);

  const { userLoggedIn } = useContext(LoginContext);

  const weatherListRef = useRef();

  const addCityToYourList = async (e) => {
    e.preventDefault();

    if (isCityValid(searchedCity)) {
      controlAlertDisplay(setErrorMsg, 'Please provide a valid city name!');
      return;
    }

    if (
      weather.some(
        (cityData) =>
          cityData.name.toLowerCase() === searchedCity.trim().toLowerCase()
      )
    ) {
      controlAlertDisplay(
        setErrorMsg,
        'This city is already on your list!',
        2.5
      );
      return;
    }

    const loadedCities = await loadJson(
      [searchedCity.trim()],
      false,
      setErrorMsg,
      setObservedCities
    ).catch(() =>
      controlAlertDisplay(setErrorMsg, 'Unexpected error occured!')
    );

    if (loadedCities.length === 0) {
      controlAlertDisplay(
        setErrorMsg,
        "Sorry, but this city doesn't exist in our database!",
        2.5
      );
      return;
    }

    setObservedCities([...observedCities, ...loadedCities.map((c) => c)]);

    setTimeout(
      () =>
        (weatherListRef.current.scrollTop =
          weatherListRef.current.scrollHeight + 57),
      500
    );

    setCityWasAdded(true);
    setSearchedCity('');
  };

  const handleCityDelete = (cityId) => {
    setWeather((prevState) => prevState.filter(({ id }) => id !== cityId));
    setObservedCities((prevState) =>
      prevState.filter(({ id }) => id !== cityId)
    );
    setCityDeleted(true);
  };

  const handleInputChange = (e) => {
    setSearchedCity(e.target.value);
  };

  const handleCityChipAdd = (e) => {
    e.preventDefault();

    if (isCityValid(searchedCity)) {
      controlAlertDisplay(setErrorMsg, 'Please provide a valid city name!');
      return;
    }

    if (
      selectedCities.find(
        (cityChip) =>
          cityChip.toLowerCase() === searchedCity.trim().toLowerCase()
      )
    ) {
      controlAlertDisplay(setErrorMsg, 'This city is already on a list!');
      return;
    }

    setSelectedCities((prevState) => [...prevState, searchedCity.trim()]);
    setSearchedCity('');
  };

  const handleCityChipDelete = (e) => {
    const cityName = e.target.closest('svg').nextElementSibling.textContent;

    setSelectedCities((prevCities) =>
      prevCities.filter((cityChip) => cityChip !== cityName)
    );
  };

  const getAPIData = async () => {
    try {
      await Promise.all(
        apiRequests.renderRequestsForCities(observedCities)
      ).then((citiesWeather) => {
        const updatedCitiesList = attachWeatherToCities(
          observedCities,
          citiesWeather
        );
        setWeather(updatedCitiesList);
      });
    } catch (err) {
      controlAlertDisplay(setErrorMsg, 'We could not load the resources');
    }
  };

  const handleDataInTimeDisplay = async (e) => {
    try {
      setLoading(true);
      const { lat } = e.target.dataset;
      const { lon } = e.target.dataset;

      const city = e.target
        .closest('li')
        .querySelector('[data-name]').textContent;

      const dataOverTime = await apiRequests.renderRequestForInTimeData(
        lat,
        lon
      );

      const data = formatHourlyData(dataOverTime.data.hourly.slice(0, 12));

      const { temp } = weather.find((data) => data.name === city);

      setHourlyData({
        city,
        temp,
        data,
      });

      setLoading(false);
    } catch (err) {
      controlAlertDisplay(setErrorMsg, 'We could not load the resources');
    }
  };

  useEffect(() => {
    if ((!refresh && observedCities.length > 0) || cityWasAdded) {
      if (intervalId) clearInterval(intervalId);
      const interval = setInterval(getAPIData, API_REFRESH_RATE * 1000);
      setIntervalId(interval);
      setRefresh(true);
      setCityWasAdded(false);
    }

    if (cityDeleted) {
      clearInterval(intervalId);
      if (observedCities.length > 0) {
        const interval = setInterval(getAPIData, API_REFRESH_RATE * 1000);
        setIntervalId(interval);
      }

      if (observedCities.length === 0) {
        setRefresh(false);
      }
      setCityDeleted(false);
    }

    if (observedCities.length > 0) {
      setSelectedCities([]);
      getAPIData();
    }
  }, [observedCities]);

  if (!userLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  if (observedCities.length === 0) {
    return (
      <>
        {fetchingFromFile ? (
          <div className="flex items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="font-medium text-2xl mr-3">Loading </p>
            <Spinner />
          </div>
        ) : (
          <div className="pt-16">
            {errorMsg && <Alert type="error" errorMsg={errorMsg} />}
            <div>
              <h1 className="font-bold uppercase text-green-600 text-center sm:text-2xl lg:text-3xl">
                Create cities watchlist
              </h1>
              <Form
                submitFn={handleCityChipAdd}
                inputValue={searchedCity}
                handleInputChange={handleInputChange}
                name="searched-city--chips"
                chipListForm={true}
                label="City"
              />
              <div className="mt-4 flex space-x-4 w-5/6 mx-auto flex-wrap justify-center max-h-80 overflow-y-scroll py-4">
                {selectedCities.map((city, index) => (
                  <CityChip key={index} handleChipDelete={handleCityChipDelete}>
                    {city}
                  </CityChip>
                ))}
              </div>
              {selectedCities.length > 0 && (
                <button
                  className="mx-auto uppercase block font-bold text-white ring-yellow-400 hover:ring-offset-2 hover:ring-2 py-2 px-7 mt-7 rounded-md bg-yellow-500 transition duration-150"
                  onClick={() =>
                    loadJson(
                      selectedCities,
                      true,
                      setErrorMsg,
                      setObservedCities,
                      setFetchingFromFile
                    )
                  }
                >
                  Load cities
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className="w-full sm:w-11/12 mx-auto rounded-md flex justify-stretch sm:items-center"
      style={{ minHeight: '100vh' }}
    >
      {errorMsg && <Alert type="error" errorMsg={errorMsg} />}
      <div className="bg-white relative shadow-md rounded-lg w-full mx-auto my-0 sm:my-7 px-3 sm:px-7 lg:px-4 py-10 flex flex-col lg:flex-row lg:justify-around lg:items-center max-w-7xl">
        <UserInformation intervalId={intervalId} />
        <div className="mt-12 lg:h-188">
          <Form
            submitFn={addCityToYourList}
            inputValue={searchedCity}
            name="add-city-to-watchlist"
            handleInputChange={handleInputChange}
            label=""
            placeholder="Add a city to your list"
          />

          <div className="relative sm:left-8 mt-10 flex flex-col items-center">
            <h2 className="text-sky-800 tracking-wide font-semibold text-3xl">
              Weather Forecast
            </h2>
            <div className="mt-8">
              <h3 className="my-5 font-medium">Your cities</h3>
              <Table
                weather={weather}
                handleCityDelete={handleCityDelete}
                handleDataInTimeDisplay={handleDataInTimeDisplay}
                weatherListRef={weatherListRef}
              />
            </div>
          </div>
        </div>
        <div
          className={`mt-12 text-center font-medium relative lg:w-80 xl:w-96 pb-6 lg:h-167 ${
            loading ? 'h-167' : ''
          }`}
        >
          {loading ? (
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          ) : hourlyData ? (
            <>
              <h5 className="mt-8 mb-3 text-3xl text-cyan-600">
                {hourlyData.city}
              </h5>
              <span className="text-lg text-blue-500 mb-5">
                {hourlyData?.temp?.toFixed(1)} °C
              </span>
              <div className={`mt-4 flex flex-col justify-around`}>
                <div>
                  <h6>Temperature</h6>
                  <div className="flex justify-center mx-auto md:w-80 lg:max-w-sm xl:w-96 h-64 mt-4 mb-10">
                    <LineChart hourlyData={hourlyData.data} />
                  </div>
                </div>
                <div>
                  <h6>Humidity</h6>
                  <BarChart data={hourlyData.data} />
                </div>
              </div>
            </>
          ) : (
            <h5 className="mt-5 lg:mt-0 lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 font-normal text-gray-500">
              Click on <span className="font-semibold text-sky-700">More </span>
              button to see hourly weather
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
