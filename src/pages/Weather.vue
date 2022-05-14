<template>
  <div class="flex items-stretch sm:items-center justify-center min-h-screen">
    <div class="block-wrapper py-24 w-full" v-show="this.weather?.length === 0">
      <CreateCitiesList :fetchCitiesFromFile="fetchCitiesFromFile" />
    </div>
    <div
      v-show="this.error.status"
      class="bg-red-300 text-red-900 fixed top-7 left-1/2 transform -translate-x-1/2 z-20 px-3 py-1.5 rounded-lg border border-red-500"
    >
      {{ this.error.msg }}
    </div>
    <div
      class="content-wrapper z-10 bg-white relative shadow-md rounded-lg w-full mx-auto my-0 sm:my-10 sm:mx-10 px-3 sm:px-7 lg:px-4 py-10 flex flex-col lg:flex-row lg:justify-around lg:items-center max-w-7xl"
      v-show="this.weather?.length > 0"
    >
      <div class="lg:h-188">
        <UserInformation :stopAPIRefreshing="_stopAPIRefreshing" />
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
            <div class="mt-8" v-show="this.weather">
              <h3 class="my-5 font-medium">Your cities</h3>
              <button
                @click="clearCitiesList"
                class=" px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-1.5 bg-sky-500 rounded-md text-white block ml-auto mb-3 uppercase hover:-translate-y-1 hover:shadow-md transform transition-transform duration-300 active:transform-y-1 focus:transform-y-1 font-medium"
              >
                clear cities
              </button>
              <Table
                :data="this.weather"
                :showInTimeData="this.showInTimeData"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="right-panel-wrapper mt-12 text-center font-medium relative lg:w-80 pb-10 mb-12"
      >
        <div v-show="!this.hourlyData?.city">
          <h5
            className="mt-5 lg:mt-0 lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 font-normal text-gray-500"
          >
            Click on
            <span className="font-semibold text-sky-700 animate-pulse"
              >More</span
            >
            button to see hourly weather
          </h5>
        </div>
        <div
          v-show="this.hourlyData?.city"
          class="mt-4 flex flex-col justify-around"
        >
          <h5 class="mt-8 mb-3 text-3xl text-cyan-600">
            {{ this.hourlyData?.city || '' }}
          </h5>
          <span class="text-lg text-blue-500 mb-5"
            >{{ this.hourlyData?.temp?.toFixed(1) }} °C</span
          >
          <div class="mt-4 flex flex-col justify-around">
            <div>
              <h6>Temperature</h6>
              <div
                class="flex justify-center mx-auto md:w-80 lg:w-80 h-64 mt-4 mb-10"
              >
                <LineChart :chartData="lineChartData" />
              </div>
            </div>
            <div>
              <BarChart :data="this.hourlyData.weather" chartTitle="Humidity" />
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
import AddCityForm from '@/components/Forms/AddCityForm';
import Table from '@/components/Table/Table';
import BarChart from '@/components/BarChart/BarChart';
import LineChart from '@/components/LineChart/LineChart';
import { API_REFRESH_RATE } from '../constants';

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
    UserInformation,
    AddCityForm,
    Table,
    BarChart,
    LineChart,
  },
  data() {
    return {
      observedCities: [],
      weather: [],
      lineChartData: {},
      hourlyData: [],
      citiesFounded: false,
      cityAlreadyAdded: false,
      error: {
        status: false,
        msg: '',
      },
      intervalId: null,
    };
  },
  mounted() {
    const storageData = this._getStorageData();
    if (storageData?.length > 0) {
      this.observedCities = storageData;
      this.getAPIData();
      this.intervalId = setInterval(
        () => this.getAPIData(),
        API_REFRESH_RATE * 1000
      );
    }
  },
  methods: {
    _setStorageData(data) {
      localStorage.setItem('weatherData', JSON.stringify(data));
    },

    _getStorageData() {
      const weatherData = JSON.parse(localStorage.getItem('weatherData'));
      if (!weatherData) return;

      return weatherData;
    },

    _emptyStorage() {
      localStorage.removeItem('weatherData');
    },

    _stopAPIRefreshing() {
      clearInterval(this.intervalId);
    },

    _showHideError(msg) {
      this.error = { status: true, msg };
      setTimeout(() => {
        this.error = { status: false, msg: '' };
      }, 2000);
    },

    _renderRequestsForCities() {
      return this.observedCities.map(({ id }) => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`
        );
      });
    },

    _renderRequestForInTimeData(lat, lon) {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
      );
    },

    _attachWeatherToCities(weatherData) {
      return this.observedCities.map((data, i) => ({
        ...data,
        temp: weatherData[i].data.main.temp,
        humidity: weatherData[i].data.main.humidity,
      }));
    },

    _formatHourlyData(data) {
      const newData = data.map(({ temp, humidity, dt }) => ({
        time: new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: true,
        }).format(new Date(dt * 1000)),
        humidity,
        temp: temp.toFixed(1),
      }));

      const finalData = newData.filter((_, i) => !(i % 2));
      return finalData;
    },

    _scrollTableToView(element) {
      setTimeout(() => (element.scrollTop = element.scrollHeight + 57), 500);
    },

    _setChartData() {
      const labels = this.hourlyData.weather.map(data => data.time);
      const data = this.hourlyData.weather.map(data => data.temp);
      this.lineChartData = {
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
    },

    clearCitiesList() {
      this.weather = [];
      this.observedCities = [];
      clearInterval(this.intervalId);
      this._emptyStorage();
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

        this._stopAPIRefreshing();

        this.intervalId = setInterval(
          () => this.getAPIData(),
          API_REFRESH_RATE * 1000
        );

        setTimeout(() => {
          this.$el.querySelector('ul').scrollTop =
            this.$el.querySelector('ul').scrollHeight;
        }, 500);
      } catch (err) {
        this._showHideError('Sorry but we cannot load the city');
      }
    },

    async showInTimeData({ lat, lon, city }) {
      try {
        const dataOverTime = await this._renderRequestForInTimeData(lat, lon);

        const { temp } = this.weather.find(data => data.name === city);

        this.hourlyData = {
          city,
          temp,
          weather: this._formatHourlyData(
            dataOverTime.data.hourly.slice(0, 12)
          ),
        };

        this._setChartData();
      } catch (err) {
        this._showHideError('Sorry but we could not load the data!');
      }
    },

    async getAPIData() {
      try {
        await Promise.all(
          this._renderRequestsForCities(this.observedCities)
        ).then(citiesWeather => {
          const updatedCitiesList = this._attachWeatherToCities(citiesWeather);
          this.weather = updatedCitiesList;
        });
      } catch (err) {
        if (err.message.includes('undefined')) return;
        this._showHideError('We could not load the resources');
      }
    },

    fetchCitiesFromFile(cities, manyCities = true) {
      let returnedCity = {};

      cities.forEach(cityName => {
        for (let i = 0, arrLen = citiesJson.length; i < arrLen; i++) {
          if (
            citiesJson[i].name === cityName ||
            (this.observedCities.some(
              city => city.country !== citiesJson[i].country
            ) &&
              cityName === citiesJson[i].name)
          ) {
            if (manyCities) {
              this.observedCities = [...this.observedCities, citiesJson[i]];
              this.citiesFounded = true;
            }

            if (!manyCities) {
              this.citiesFounded = true;
              returnedCity = citiesJson[i];
            }

            this._setStorageData(this.observedCities);
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

      if (manyCities) {
        this.getAPIData();
        this.intervalId = setInterval(
          () => this.getAPIData(),
          API_REFRESH_RATE * 1000
        );
      }

      if (this.observedCities.length !== cities.length) {
        this._showHideError('Sorry, but we could not load all the cities.');
      }

      if (Object.keys(returnedCity).length > 0) return returnedCity;
    },
  },
};
</script>

<style scoped>
.block-wrapper {
  min-height: 100vh !important;
}

.content-wrapper {
  min-height: 750px !important;
}

.right-panel-wrapper {
  height: 670px !important;
}
</style>
