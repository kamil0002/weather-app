<template>
  <div>
    <div class="block mt-16" v-show="this.weather?.length === 0">
      <CreateCitiesList :fetchCountriesFromFile="fetchCountriesFromFile" />
    </div>
    <div
      class="wrapper w-full sm:w-11/12 mx-auto rounded-md flex justify-stretch items-center"
      v-show="this.weather?.length > 0"
    >
      <div
        class="left-panel-wrapper z-10 bg-white relative shadow-md rounded-lg w-full px-3 sm:px-7 lg:px-4 py-10 sm:my-10 flex flex-col lg:flex-row lg:justify-around max-w-7xl mx-auto"
      >
        <UserInformation />
      </div>
    </div>
  </div>
</template>

<script>
// import citiesJson from '@/dev-data/city.list.json';
import CreateCitiesList from '@/components/CreateCitiesList/CreateCitiesList';
import UserInformation from '@/components/UserInformation/UserInformation';
import axios from 'axios';
import { API_KEY } from '@/constants';

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
    UserInformation,
  },
  data() {
    return {
      observedCities: [],
      weather: ['Test'],
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

<style scoped>
.wrapper {
  min-height: 100vh;
}

.left-panel-wrapper {
  min-height: 750px;
}
</style>
