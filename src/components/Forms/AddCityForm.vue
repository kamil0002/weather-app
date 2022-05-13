<template>
  <form
    class="py-8 flex flex-col items-center"
    @submit="submitForm"
    autoComplete="off"
  >
    <div class="mt-4">
      <label htmlFor="{name}" className="block"> City </label>
      <input
        @focus="this.hideErrorMessage"
        class="focus:border-yellow-600 border-gray-300, transition-all duration-200 py-1.5 mt-1 w-64 max-w-xs outline-none px-1.5 rounded-sm border focus:outline-none focus:border"
        v-model="city"
      />
      <span
        v-show="this.cityInvalid"
        class="text-red-700 font-medium text-sm block mt-1"
        >Please provide a valid city name</span
      >
    </div>

    <Button buttonText="add" />
  </form>
</template>

<script>
import Button from '../Button/Button.vue';

export default {
  name: 'AddCityForm',
  props: {
    submitFn: Function,
  },
  components: {
    Button,
  },
  data() {
    return {
      city: '',
      cityInvalid: false,
    };
  },

  methods: {
    _isCityNameInvalid(searchText) {
      return (
        !searchText ||
        /\d/.test(searchText) ||
        !/[a-zA-Z]/.test(searchText) ||
        searchText.length < 2
      );
    },
    submitForm(e) {
      e.preventDefault();
      if (this._isCityNameInvalid(this.city)) {
        this.cityInvalid = true;
        return;
      }
      this.submitFn(this.city);
      this.city = '';
    },

    hideErrorMessage() {
      this.cityInvalid = false;
    },
  },
};
</script>
