<template>
  <div>
    <div class="block mt-16" v-show="this.weather?.length === 0">
      <CreateCitiesList :fetchCitiesFromFile="fetchCitiesFromFile" />
    </div>
    <div
      class="wrapper w-full sm:w-11/12 mx-auto rounded-md flex justify-stretch items-center z-10"
      v-show="this.weather?.length > 0"
    >
      <div
        v-show="this.error.status"
        class="bg-red-300 text-red-900 fixed top-7 left-1/2 transform -translate-x-1/2 z-20 px-3 py-1.5 rounded-lg border border-red-500"
      >
        {{ this.error.msg }}
      </div>
      <div
        class="left-panel-wrapper z-10 bg-white relative shadow-md rounded-lg w-full px-3 sm:px-7 lg:px-4 py-10 sm:my-10 flex flex-col lg:flex-row lg:justify-around max-w-7xl mx-auto"
      >
        <UserInformation />
        <div class="mt-12">
          <div class="flex items-center justify-center lg:justify-start">
            <AddCityForm
              :submitFn="handleCityAdd"
              :singleCity="true"
              :placeholder="`Add a city to your list`"
              :cityAlreadyAdded="this.cityAlreadyAdded"
            />
          </div>
          <div class="relative sm:left-8 mt-10 flex flex-col items-center">
            <h2 class="text-sky-800 tracking-wide font-semibold text-3xl">
              Weather Forecast
            </h2>
            <div class="mt-8">
              <h3 class="my-5 font-medium">Your cities</h3>
              <Table :data="this.weather || []" />
            </div>
          </div>
        </div>
        <div
          class="mt-12 text-center font-medium relative lg:w-80 pb-10 mb-12"
          style="height: 670px"
        >
          <h4 class="text-sky-800 mt-10 lg:mt-0">
            Keep Track Of Hourly Weather
          </h4>

          <h5 class="my-8 text-xl uppercase text-cyan-600">RZESZÓW</h5>
          <div class="mt-4 flex flex-col justify-around">
            <div>
              <h6>Temperature</h6>
              <div
                class="flex justify-center mx-auto md:w-80 lg:max-w-sm h-64 mt-4 mb-10"
              >
                <!-- <LineChart hourlyData="{hourlyData[1]}" /> -->
              </div>
            </div>
            <div>
              <h6>Humidity</h6>
              <div class="flex space-x-4 justify-center">
                <div class="flex flex-col justify-end items-center mt-4 mb-7">
                  <span class="text-xs">63</span>
                  <div
                    class="my-2 bg-sky-300 w-2 rounded-lg"
                    style="height: 90px"
                  />
                  <span class="text-xs">2 AM</span>
                </div>
                <div class="flex flex-col justify-end items-center mt-4 mb-7">
                  <span class="text-xs">63</span>
                  <div
                    class="my-2 bg-sky-300 w-2 rounded-lg"
                    style="height: 90px"
                  />
                  <span class="text-xs">2 AM</span>
                </div>
                <div class="flex flex-col justify-end items-center mt-4 mb-7">
                  <span class="text-xs">63</span>
                  <div
                    class="my-2 bg-sky-300 w-2 rounded-lg"
                    style="height: 90px"
                  />
                  <span class="text-xs">2 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import citiesJson from '@/dev-data/city.list.json';
import CreateCitiesList from '@/components/CreateCitiesList/CreateCitiesList';
import UserInformation from '@/components/UserInformation/UserInformation';
import axios from 'axios';
import { API_KEY } from '@/constants';
import AddCityForm from '@/components/Forms/AddCityForm.vue';
import Table from '@/components/Table/Table';

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
    UserInformation,
    AddCityForm,
    Table,
  },
  data() {
    return {
      observedCities: [],
      weather: ['Test'],
      citiesFounded: false,
      cityAlreadyAdded: false,
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
    _showHideError(msg) {
      this.error = { status: true, msg };
      setTimeout(() => {
        this.error = { status: false, msg: '' };
      }, 2000);
    },

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

    async handleCityAdd(cityName, isCityInvalid) {
      try {
        if (isCityInvalid) {
          this._showHideError('Please provide a valid city name!');
          return;
        }
        if (this.weather.some(cityData => cityData.name === cityName)) {
          this._showHideError('This city is already on your list!');
          return;
        }

        const loadedCity = this.fetchCitiesFromFile([cityName], false);

        if (!loadedCity) {
          this._showHideError(
            "Sorry, but this country doesn't exist in our database!"
          );
          return;
        }

        this.observedCities = [...this.observedCities, loadedCity];

        await this.getAPIData();

        console.log(this.weather);
      } catch (err) {
        this._showHideError('Sorry but we cannot load the city');
      }
    },

    async getAPIData() {
      console.log('CALLED');
      try {
        await Promise.all(
          this._renderRequestsForCountries(this.observedCities)
        ).then(citiesWeather => {
          const updatedCitiesList = this._attachWeatherToCities(citiesWeather);
          this.weather = updatedCitiesList;
        });
      } catch (err) {
        console.log(err);
        this._showHideError('We could not load the resources');
      }
    },

    fetchCitiesFromFile(cities, manyCities = true) {
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

      if (!this.citiesFounded)
        this._showHideError(
          `Sorry but our database does not include selected ${
            cities.length > 1 ? 'cities' : 'city'
          }`
        );

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
