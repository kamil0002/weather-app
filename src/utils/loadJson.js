import controlAlertDisplay from './controlAlertDisplay';

export default (
  userCities,
  manyCities = true,
  setErrorMsg,
  setObservedCities,
  setFetchingFromFile
) => {
  if (setFetchingFromFile) setFetchingFromFile(true);
  return import('assets/city.list.json').then((module) => {
    const localData = [];

    const data = module.default;
    for (
      let i = 0, userCitiesLength = userCities.length;
      i < userCitiesLength;
      i++
    ) {
      for (let j = 0, jsonDataLength = data.length; j < jsonDataLength; j++) {
        if (data[j].name.toLowerCase() === userCities[i].toLowerCase()) {
          localData.push(data[j]);
        }
      }
    }
    const filteredCities = localData.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ['country', 'name'].every((k) => v2[k] === v[k])
        ) === i
    );

    if (manyCities) {
      setObservedCities(filteredCities);
    }

    if (filteredCities.length === 0)
      controlAlertDisplay(
        setErrorMsg,
        `Sorry but our database does not include selected ${
          userCities.length > 1 ? 'cities' : 'city'
        }`
      );
    if (setFetchingFromFile) setFetchingFromFile(false);
    return filteredCities;
  });
};
