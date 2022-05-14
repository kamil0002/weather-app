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
            <div class="mt-8" v-show="this.weather">
              <h3 class="my-5 font-medium">Your cities</h3>
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
        <div v-show="this.hourlyData.length === 0">
          <h5
            className="mt-5 lg:mt-0 lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 font-normal text-gray-500"
          >
            Click on
            <span className="font-semibold text-sky-700">More</span> button to
            see hourly weather
          </h5>
        </div>
        <div
          v-show="this.hourlyData.length > 0"
          class="mt-4 flex flex-col justify-around"
        >
          <h4 class="text-sky-800 mt-10 lg:mt-0">
            Keep Track Of Hourly Weather
          </h4>

          <h5 class="my-8 text-xl uppercase text-cyan-600">
            {{ this.hourlyData[0] }}
          </h5>
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
              <BarChart :data="this.hourlyData" chartTitle="Humidity" />
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
    };
  },
  created() {
    // window.addEventListener(
    //   'beforeunload',
    //   localStorage.removeItem('authenticated')
    // );
  },
  mounted() {
    // console.log(this.cookies.get('auth-token'));
  },
  methods: {
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
    /* eslint-disable */
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
        temp,
      }));

      const finalData = newData.filter((_, i) => !(i % 2));
      return finalData;
    },

    _scrollTableToView(element) {
      setTimeout(() => (element.scrollTop = element.scrollHeight + 57), 500);
    },

    _setChartData() {
      const labels = this.hourlyData[1].map(data => data.time);
      const data = this.hourlyData[1].map(data => data.temp.toFixed(1));
      this.lineChartData = {
        labels,
        datasets: [
          {
            label: 'Celsius Degress',
            fill: false,
            data,
            borderColor: 'rgb(76, 192, 192)',
            backgroundColor: 'rgba(76, 192, 192, 0.5)',
          },
        ],
      };
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

        this.hourlyData = [
          city,
          this._formatHourlyData(dataOverTime.data.hourly.slice(0, 12)),
        ];

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
          if (citiesJson[i].name === cityName) {
            if (manyCities) {
              this.observedCities = [...this.observedCities, citiesJson[i]];
              this.citiesFounded = true;
              this.getAPIData();
            }

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

      if(this.observedCities.length !== cities.length) {
        this._showHideError('Sorry, but we could not load all the cities.')
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
