<template>
  <div>
    <h1
      className="font-bold uppercase text-green-600 text-center sm:text-2xl lg:text-3xl"
    >
      Create cities watchlist
    </h1>
    <AddCityForm :submitFn="onSubmit" />
    <div
      :key="city.name"
      v-for="city in this.cities"
      className="mt-4 flex space-x-4 w-5/6 mx-auto flex-wrap justify-center max-h-80 overflow-y-scroll py-4"
    >
      <CityChip :cityName="city" />
    </div>
  </div>
</template>

<script>
import AddCityForm from './../Forms/AddCityForm.vue';
import CityChip from './../CityChip/CityChip.vue';

export default {
  name: 'CreateCitiesList',
  components: {
    AddCityForm,
    CityChip,
  },
  data() {
    return {
      cities: [],
    };
  },
  methods: {
    onSubmit(city) {
      this.cities = [...this.cities, city];
    },
  },
};
</script>
