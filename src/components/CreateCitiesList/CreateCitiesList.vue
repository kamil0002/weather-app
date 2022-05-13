<template>
  <div>
    <h1
      className="font-bold uppercase text-green-600 text-center sm:text-2xl lg:text-3xl"
    >
      Create cities watchlist
    </h1>
    <AddCityForm :submitFn="onSubmit" />
  </div>
</template>

<script>
import AddCityForm from './../Forms/AddCityForm';

export default {
  name: 'CreateCitiesList',
  components: {
    AddCityForm,
  },
  data() {
    return {
      cities: [],
    };
  },
  methods: {
    onSubmit(city) {
      console.log(city);
    },
  },
};
</script>
