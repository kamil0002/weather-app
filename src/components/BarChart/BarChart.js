import React from 'react';
import PropTypes from 'prop-types';

const BarChart = ({ data }) => {
  return (
    <>
      <div className="flex space-x-4 justify-center">
        {data.map(({ time, humidity }) => (
          <div
            key={humidity + time + Math.random()}
            className="flex flex-col justify-end items-center mt-4 mb-7"
          >
            <span className="text-xs">{humidity}</span>
            <div
              className="my-2 bg-sky-300 w-2 rounded-lg"
              style={{ height: `${humidity * 1.4}px` }}
            />
            <span className="text-xs">{time}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.array,
};
