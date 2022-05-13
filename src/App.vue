<template>
  <div>
    <nav>Hello</nav>
    <router-view />
  </div>
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
