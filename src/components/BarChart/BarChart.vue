<template>
  <div class="mt-8">
    <h6>{{ chartTitle }}</h6>
    <div class="flex space-x-4 justify-center">
      <div
        v-for="hourlyData in data"
        :key="hourlyData.time + hourlyData.humidity + Math.random()"
        class="flex flex-col justify-end items-center mt-4"
      >
        <span class="text-xs">{{ hourlyData.humidity }}</span>
        <div
          class="my-2 bg-sky-300 w-2 rounded-lg"
          :style="`height: ${hourlyData.humidity * 1.4}px`"
        />
        <span class="text-xs">{{ hourlyData.time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      require: true,
    },
    chartTitle: {
      type: String,
      require: true,
    },
  },
};
</script>
