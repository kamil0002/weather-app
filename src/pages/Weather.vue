<template>
  <div>
    <p>Weather {{ userLoggedIn }}</p>
  </div>
</template>

<script>
export default {
  name: 'weather-page',
  props: {
    userLoggedIn: Boolean,
    redirect: Function,
  },
  methods: {},
};
</script>
