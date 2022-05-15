<template>
  <button
    :class="[
      classes ? classes : 'ring-green-400 bg-green-500 mt-5',
      'uppercase block font-bold text-white hover:ring-offset-2 hover:ring-2 py-2 px-7 rounded-md transition duration-150',
    ]"
    type="submit"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'submit-button',
  props: {
    buttonText: {
      type: String,
      require: true,
    },
    classes: {
      type: String,
      default: '',
    },
  },
};
</script>
