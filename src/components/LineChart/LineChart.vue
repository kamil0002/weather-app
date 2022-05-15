<template>
  <div>
    <h6>{{ title }}</h6>
    <div class="flex justify-center mx-auto md:w-80 lg:w-80 h-64 mt-4">
      <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :styles="styles"
      />
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'LinerChart',
  components: { Line },
  props: {
    title: {
      type: String,
      require: true,
    },
    chartData: {
      type: Object,
      require: true,
    },

    chartId: {
      type: String,
      default: 'bar-chart',
    },
    styles: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: '100%',
        };
      },
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
