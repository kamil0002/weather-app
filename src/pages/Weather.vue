<template>
  <div>
    <div class="block mt-16">
      <CreateCitiesList />
    </div>
  </div>
</template>

<script>
import CreateCitiesList from './../components/CreateCitiesList/CreateCitiesList';

export default {
  name: 'weather-page',
  components: {
    CreateCitiesList,
  },
  created() {
    // window.addEventListener(
    //   'beforeunload',
    //   localStorage.removeItem('authenticated')
    // );
  },
  methods: {},
};
</script>
