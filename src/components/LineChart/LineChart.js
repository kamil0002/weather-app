import React from 'react';
import PropTypes from 'prop-types';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    font: {
      weight: 500,
      size: 14,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += `${context.parsed.y} °C`;
          }
          return label;
        },
      },
    },
  },
};

const LineChart = ({ hourlyData }) => (
  <Line
    options={options}
    data={{
      labels: hourlyData.map(({ time }) => time),
      datasets: [
        {
          data: hourlyData.map(({ temp }) => temp.toFixed(1)),
          borderColor: 'rgb(76, 192, 192)',
          backgroundColor: 'rgba(76, 192, 192, 0.5)',
        },
      ],
    }}
  />
);

export default LineChart;

LineChart.propTypes = {
  hourlyData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
