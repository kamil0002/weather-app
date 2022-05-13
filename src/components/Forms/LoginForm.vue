<template>
  <form
    class="py-8 flex flex-col items-center"
    @submit="onSubmit"
    autoComplete="off"
  >
    <div class="mt-4">
      <label htmlFor="{name}" className="block"> Login </label>
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
      <label htmlFor="{name}" className="block"> Password </label>
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
    <Button content="login"></Button>
  </form>
</template>

<script>
import Button from './../Button/Button.vue';

import { LOGIN, PASSWORD } from '../../constants';

export default {
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
        localStorage.setItem('authenticated', JSON.stringify(true));
        this.$router.push('/');
      }
    },
  },
};
</script>
