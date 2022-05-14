<template>
  <div class="w-full">
    <h1
      className="font-bold uppercase text-green-600 text-center sm:text-2xl lg:text-3xl"
    >
      Create cities watchlist
    </h1>
    <AddCityForm
      :submitFn="onSubmit"
      :hideError="hideError"
      :cityAlreadyAdded="this.cityAlreadyAdded"
    />
    <div
      className="mt-4 flex space-x-4 w-11/12 sm:w-5/6 mx-auto flex-wrap justify-center max-h-80 overflow-y-scroll py-4"
    >
      <CityChip
        :key="city.name"
        v-for="city in this.cities"
        :cityName="city"
        :handleClick="this.handleChipDelete.bind(this, city)"
      />
    </div>
    <button
      @click="this.handleDataFetch"
      v-if="this.cities.length > 0"
      class="mx-auto uppercase block font-bold text-white ring-yellow-400 hover:ring-offset-2 hover:ring-2 py-2 px-7 mt-7 rounded-md bg-yellow-500 transition duration-150"
    >
      Load countries
    </button>
  </div>
</template>

<script>
import AddCityForm from './../Forms/AddCityForm.vue';
import CityChip from './../CityChip/CityChip.vue';

export default {
  name: 'CreateCitiesList',
  props: {
    fetchCitiesFromFile: Function,
  },
  components: {
    AddCityForm,
    CityChip,
  },
  data() {
    return {
      cities: [],
      cityAlreadyAdded: false,
    };
  },
  methods: {
    onSubmit(city, isCityInvalid) {
      if (isCityInvalid) return;
      if (this.cities.indexOf(city) !== -1) {
        this.cityAlreadyAdded = true;
        return;
      }

      this.cities = [...this.cities, city];
    },

    hideError() {
      this.cityAlreadyAdded = false;
    },

    handleChipDelete(clickedCity) {
      this.cities = this.cities.filter(city => city !== clickedCity);
    },

    handleDataFetch() {
      this.fetchCitiesFromFile(Object.values(this.cities));
    },
  },
};
</script>
