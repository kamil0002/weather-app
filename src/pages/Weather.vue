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
        <div class="mt-12">
          <div class="flex items-center justify-center lg:justify-start">
            <AddCityForm
              :singleCity="true"
              :placeholder="`Add a city to your list`"
            />
          </div>
          <div class="relative sm:left-8 mt-10 flex flex-col items-center">
            <h2 class="text-sky-800 tracking-wide font-semibold text-3xl">
              Weather Forecast
            </h2>
            <div class="mt-8">
              <h3 class="my-5 font-medium">Your cities</h3>
              <ul
                class="odd:bg-sky-50 overflow-y-scroll scroll-smooth"
                style="max-height: 420px"
              >
                <li
                  class="flex text-gray-700 space-x-3 sm:space-x-10 w-max text-xs sm:text-sm lg:space-x-14 py-4 pr-5"
                >
                  <span class="w-28 md:w-32" data-name>Republic of Poland</span>
                  <span class="flex w-16 sm:w-20 items-center">
                    <img
                      src="@/assets/termometer.svg"
                      class="text-blue-400 text-xl mr-1"
                      alt="Temperature"
                    />
                    20 °C
                  </span>
                  <span class="flex items-center w-11">
                    <img
                      src="@/assets/humidity.svg"
                      class="text-blue-400 text-2xl mr-1"
                      alt="Humidity"
                    />
                    63
                  </span>
                  <button
                    class="text-xs font-medium transform hover:bg-blue-400 hover:text-white hover:-translate-y-0.5 active:translate-y-0.5 focus:translate-y-0.5 px-2 py-1 mr-2 transition duration-300 hover:shadow-md"
                    data-lat="{city.coord.lat}"
                    data-lon="{city.coord.lon}"
                  >
                    More
                  </button>
                </li>
              </ul>
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

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
    UserInformation,
    AddCityForm,
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
