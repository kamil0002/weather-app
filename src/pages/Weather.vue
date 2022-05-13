<template>
  <div>
    <div class="block mt-16" v-show="this.weather?.length === 0">
      <CreateCitiesList :fetchCountriesFromFile="fetchCountriesFromFile" />
    </div>
  </div>
</template>

<script>
import CreateCitiesList from './../components/CreateCitiesList/CreateCitiesList';
import citiesJson from '@/dev-data/city.list.json';
import axios from 'axios';
import { API_KEY } from '@/constants';

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
  },
  data() {
    return {
      observedCities: [],
      weather: [],
      citiesFounded: false,
      error: {
        status: false,
        msg: '',
      },
    };
  },
  created() {
    // window.addEventListener(
    //   'beforeunload',
    //   localStorage.removeItem('authenticated')
    // );
  },
  methods: {
    _renderRequestsForCountries() {
      return this.observedCities.map(({ id }) => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`
        );
      });
    },

    _attachWeatherToCities(weatherData) {
      return this.observedCities.map((data, i) => ({
        ...data,
        temp: weatherData[i].data.main.temp,
        humidity: weatherData[i].data.main.humidity,
      }));
    },

    async getAPIData() {
      console.log('CALLED');
      try {
        await Promise.all(
          this._renderRequestsForCountries(this.observedCities)
        ).then(citiesWeather => {
          const updatedCitiesList = this._attachWeatherToCities(citiesWeather);
          this.weather = updatedCitiesList;
          console.log(this.weather, 'DUNNO');
        });
      } catch (err) {
        console.log(err);
        this.error = { status: true, msg: 'We could not load the resources' };
        setTimeout(() => (this.error.status = false), 2000);
      }
    },

    fetchCountriesFromFile(cities, manyCities = true) {
      let returnedCity = {};

      cities.forEach(cityName => {
        for (let i = 0, arrLen = citiesJson.length; i < arrLen; i++) {
          if (citiesJson[i].name === cityName) {
            if (manyCities)
              this.observedCities = [...this.observedCities, citiesJson[i]];
            this.citiesFounded = true;

            if (!manyCities) {
              this.citiesFounded = true;
              returnedCity = citiesJson[i];
            }

            break;
          }
        }
      });
      this.getAPIData();

      // if (!this.citiesFounded)
      //* Display Alert Later
      // controlAlertDisplay(
      //   setErrorMsg,
      //   `Sorry but our database does not include selected ${
      //     userCities.length > 1 ? 'cities' : 'city'
      //   }`
      // );

      if (Object.keys(returnedCity).length > 0) return returnedCity;
    },
  },
};
</script>
