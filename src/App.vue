<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {},

  methods: {
    handleUserLogin() {
      localStorage.setItem('authenticated', true);
    },
    handleUserLogout() {
      localStorage.setItem('authenticated', false);
    },
  },
};
</script>
