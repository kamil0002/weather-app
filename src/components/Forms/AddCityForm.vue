<template>
  <form
    :class="[
      singleCity
        ? 'flex-row items-center justify-center lg:justify-start'
        : 'py-8 flex-col',
      'flex',
    ]"
    @submit="submitForm"
    autoComplete="off"
  >
    <div class="[singleCity ? 'flex': '','mt-4 ']">
      <label for="city" class="block">{{ singleCity ? '' : 'City' }}</label>
      <div class="flex items-center">
        <img
          class="ml-2 absolute"
          src="@/assets/magnifying-glass.svg"
          alt="magnifying glass"
        />
        <input
          @focus="this.hideErrorMessage"
          :class="[
            placeholder ? 'w-44 sm:w-64 pl-9 text-xs sm:text-base' : '',
            'focus:border-yellow-600 border-gray-300, transition-all duration-200 py-1.5 mt-1 w-64 max-w-xs outline-none px-1.5 rounded-sm border focus:outline-none focus:border',
          ]"
          v-model="city"
          id="city"
          :placeholder="placeholder"
        />
      </div>
      <span
        v-show="this.cityInvalid && !singleCity"
        class="text-red-700 font-medium text-sm block mt-1"
        >Please provide a valid city name</span
      >
      <span
        v-show="this.cityAlreadyAdded && !singleCity"
        class="text-red-700 font-medium text-sm block mt-1"
        >This city is already on your list!</span
      >
    </div>

    <Button :classes="singleCity ? `bg-blue-500 ml-7` : ``" buttonText="add" />
  </form>
</template>

<script>
import Button from '../Button/Button.vue';

export default {
  name: 'AddCityForm',
  props: {
    submitFn: Function,
    hideError: {
      type: Function,
      default: () => {}
    },
    cityAlreadyAdded: Boolean,
    singleCity: Boolean,
    placeholder: String,
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
      }

      this.submitFn(this.city, this.cityInvalid);
      this.city = '';
    },

    hideErrorMessage() {
      this.cityInvalid = false;
      this.hideError();
    },
  },
};
</script>
