import axios from 'axios';
import { API_KEY } from '../constants';

const renderRequestsForCities = (cities) => {
  const urls = cities.map(({ id }) => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`
    );
  });

  return urls;
};

const renderRequestForInTimeData = (lat, lon) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
  );
};

export default {
  renderRequestForInTimeData,
  renderRequestsForCities,
};
