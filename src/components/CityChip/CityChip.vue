<template>
  <div
    class="bg-white w-max px-2 md:px-4 py-1 mt-3 shadow-md rounded-sm flex items-center"
  >
    <img
      @click="handleClick"
      class="cursor-pointer mr-1.5 sm:mr-2 w-4 sm:w-auto"
      src="@/assets/delete-chip.svg"
      alt="Delete Chip"
    />
    <span class="text-xs sm:text-sm">{{ cityName }}</span>
  </div>
</template>

<script>
export default {
  name: 'CityChip',
  props: {
    cityName: String,
    handleClick: Function,
  },
};
</script>
