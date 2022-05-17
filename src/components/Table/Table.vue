<template>
  <ul
    class="odd:bg-sky-50 overflow-y-scroll scroll-smooth"
    style="max-height: 420px"
  >
    <li
      v-for="(city, index) in data"
      :key="city.id + Math.random()"
      :class="[
        index > 0 ? 'border-t' : '' > 0,
        'flex bg-white text-gray-700 space-x-3 sm:space-x-10 w-max text-xs sm:text-sm lg:space-x-14 py-4 pr-5',
      ]"
    >
      <div class="w-28 md:w-32 flex items-center">
        <img
          class="mr-1 cursor-pointer"
          src="@/assets/images/remove_city.svg"
          alt="remove city"
          @click="$emit('delete-city', city.id)"
        />
        <span data-name>{{ city.name }}</span>
        <sub className="font-medium text-gray-600">({{ city.country }})</sub>
      </div>
      <span class="flex w-16 sm:w-20 items-center">
        <img
          src="@/assets/images/termometer.svg"
          class="text-blue-400 text-xl mr-1"
          alt="Temperature"
        />
        {{ city.temp.toFixed(1) }} °C
      </span>
      <span class="flex items-center w-11">
        <img
          src="@/assets/images/humidity.svg"
          class="text-blue-400 text-2xl mr-1"
          alt="Humidity"
        />
        {{ city.humidity }}
      </span>
      <button
        @click="
          $emit(
            'display-hourly-data',
            city.coord.lat,
            city.coord.lon,
            city.name
          )
        "
        class="text-xs font-medium transform hover:bg-blue-400 hover:text-white hover:-translate-y-0.5 active:translate-y-0.5 focus:translate-y-0.5 px-2 py-1 mr-2 transition duration-300 hover:shadow-md"
      >
        More
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'cities-table',
  props: {
    data: {
      type: Array,
      require: true,
    },
  },
};
</script>
