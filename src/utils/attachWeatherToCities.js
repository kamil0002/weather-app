export default (observableList, weatherData) => {
  return observableList.map((data, i) => ({
    ...data,
    temp: weatherData[i].data.main.temp,
    humidity: weatherData[i].data.main.humidity,
  }));
};
