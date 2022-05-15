export default (weatherData, observedCities) =>
  observedCities.map((data, i) => ({
    ...data,
    temp: weatherData[i].data.main.temp,
    humidity: weatherData[i].data.main.humidity,
  }));
