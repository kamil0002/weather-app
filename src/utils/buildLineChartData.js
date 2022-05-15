export default weatherData => {
  const labels = weatherData.map(({ time }) => time);
  const data = weatherData.map(({ temp }) => temp);

  return {
    labels,
    datasets: [
      {
        label: 'Celsius Degrees',
        fill: false,
        data,
        borderColor: 'rgb(76, 192, 192)',
        backgroundColor: 'rgba(76, 192, 192, 0.5)',
      },
    ],
  };
};
