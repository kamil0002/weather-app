<template>
  <div>
    <p>Weather {{ userLoggedIn }}</p>
  </div>
</template>

<script>
export default {
  name: 'weather-cmp',
  props: {
    userLoggedIn: Boolean,
    redirect: Function,
  },
  methods: {},
};
</script>
