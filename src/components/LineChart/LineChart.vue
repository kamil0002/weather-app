<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :styles="styles"
  />
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
