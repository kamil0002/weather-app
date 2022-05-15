<template>
  <form
    class="py-8 flex flex-col items-center"
    @submit="onSubmit"
    autoComplete="off"
  >
    <div class="mt-4">
      <label htmlFor="{name}" class="block"> Login </label>
      <input
        :class="[
          this.login === this.validLogin
            ? 'focus:border-green-600 border-green-600'
            : 'focus:border-yellow-600 border-gray-300',
          'transition-all duration-200 py-1.5 mt-1 w-64 max-w-xs outline-none px-1.5 rounded-sm border focus:outline-none focus:border',
        ]"
        v-model="login"
      />
      <span
        v-show="this.isLoginValid"
        class="text-red-700 font-medium text-sm block mt-1"
        >Login incorrect</span
      >
    </div>

    <div class="mt-4">
      <label htmlFor="{name}" class="block"> Password </label>
      <input
        :class="[
          this.password === this.validPassword
            ? 'focus:border-green-600 border-green-600'
            : 'focus:border-yellow-600 border-gray-300',
          'transition-all duration-200 py-1.5 mt-1 w-64 max-w-xs outline-none px-1.5 rounded-sm border focus:outline-none focus:border',
        ]"
        v-model="password"
      />
      <span
        v-show="this.isPasswordValid"
        class="text-red-700 font-medium text-sm block mt-1"
        >Password incorrect</span
      >
    </div>
    <Button buttonText="login" />
  </form>
</template>

<script>
import { useCookies } from 'vue3-cookies';

import Button from './../Button/Button.vue';
import { LOGIN, PASSWORD } from '../../constants';

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  name: 'LoginForm',
  components: {
    Button,
  },

  data() {
    return {
      validLogin: LOGIN,
      validPassword: PASSWORD,
      isLoginValid: false,
      isPasswordValid: false,
      login: '',
      password: '',
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.isLoginValid = this.password === PASSWORD;
      this.isPasswordValid = this.login === LOGIN;

      if (this.isLoginValid && this.isPasswordValid) {
        this.cookies.set(
          'auth-token',
          `${String(Date.now()).slice(-10)}${Math.random()}`.replace('.', ''),
          '12h'
        );
        this.$router.push('/');
      }
    },
  },
};
</script>
