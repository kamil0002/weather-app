<template>
  <div
    className="bg-white w-max px-4 py-1 mt-3 shadow-md rounded-sm flex items-center"
  >
    <img
      @click="handleClick"
      class="cursor-pointer mr-2"
      src="@/assets/delete-chip.svg"
      alt="Delete Chip"
    />
    <span>{{ cityName }}</span>
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
