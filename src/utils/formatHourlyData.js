export default data => {
  const newData = data.map(({ temp, humidity, dt }) => ({
    time: new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: true,
    }).format(new Date(dt * 1000)),
    humidity,
    temp: temp.toFixed(1),
  }));

  return newData.filter((_, i) => !(i % 2));
};
