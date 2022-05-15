const setStorageData = (itemName, data) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

const getStorageData = item => {
  const weatherData = JSON.parse(localStorage.getItem(item));
  if (!weatherData) return;

  return weatherData;
};

const removeStorageItem = item => {
  localStorage.removeItem(item);
};

export default {
  getStorageData,
  setStorageData,
  removeStorageItem,
};
