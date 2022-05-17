export default async userCities => {
  return import('@/assets/city.list.json').then(async module => {
    try {
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
          a.findIndex(v2 => ['country', 'name'].every(k => v2[k] === v[k])) ===
          i
      );

      if (filteredCities.length === 0)
        throw new Error(
          `Sorry but our database does not include selected ${
            userCities.length > 1 ? 'cities' : 'city'
          }`
        );

      return filteredCities;
    } catch (err) {
      throw new Error(err.message);
    }
  });
};
