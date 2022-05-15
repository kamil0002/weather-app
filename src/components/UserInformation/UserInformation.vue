<template>
  <div class="absolute top-3 right-7 flex items-center">
    <span class="text-gray-500 select-none">
      Logged in as
      <span class="font-medium text-sky-900">{{ this.LOGIN }}</span>
    </span>
    <span class="px-1.5 text-gray-400 font-sans select-none">|</span>
    <button
      @click="handleLogout"
      class="flex items-center hover:bg-blue-400 hover:text-white mr-2 px-2 py-1 rounded-md font-medium transition-colors duration-150"
    >
      <span class="mr-2">Logout</span>
      <img src="@/assets/logout-icon.svg" alt="Logout" />
    </button>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';

import { LOGIN } from '@/constants';

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  name: 'UserInformation',
  props: {
    stopAPIRefreshing: Function
  },
  data() {
    return {
      LOGIN,
    };
  },

  methods: {
    handleLogout() {
      this.stopAPIRefreshing();
      this.cookies.remove('auth-token');
      this.$router.push('/login');
    },
  },
};
</script>
