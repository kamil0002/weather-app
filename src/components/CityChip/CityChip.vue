<template>
  <div
    className="bg-white w-max px-4 py-1 mt-3 shadow-md rounded-sm flex items-center"
  >
    <img src="@/assets/delete-chip.png" alt="Delete Chip" />
    <span>{{ cityName }}</span>
  </div>
</template>

<script>
export default {
  name: 'CityChip',
  props: {
    cityName: String,
  },
};
</script>
