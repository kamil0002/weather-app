import React from 'react';
import PropTypes from 'prop-types';
import { WiHumidity } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

const Table = ({
  weather,
  handleDataInTimeDisplay,
  handleCityDelete,
  weatherListRef,
}) => {
  return (
    <ul
      className="odd:bg-sky-50 overflow-y-scroll scroll-smooth"
      ref={weatherListRef}
      style={{ maxHeight: '420px' }}
    >
      {weather.map((city, i) => (
        <li
          key={city.id + i}
          className={`flex text-gray-700 space-x-3 sm:space-x-10 w-max text-xs sm:text-sm lg:space-x-14 py-4 pr-5 ${
            i > 0 ? 'border-t' : ''
          }`}
        >
          <div className="w-28 md:w-32 flex items-center">
            <TiDelete
              className="text-lg text-red-500 mr-1.5 cursor-pointer"
              onClick={() => handleCityDelete(city.id)}
            />
            <span data-name>{city.name}</span>
            <sub className="font-medium text-gray-600">({city.country})</sub>
          </div>
          <span className="flex w-16 sm:w-20 items-center">
            <FaTemperatureHigh className="text-blue-400 text-xl mr-1" />
            {city.temp.toFixed(1)} °C
          </span>
          <span className="flex items-center w-11">
            <WiHumidity className="text-blue-400 text-2xl mr-1" />
            {city.humidity}
          </span>
          <button
            className="text-xs font-medium transform hover:bg-blue-400 hover:text-white hover:-translate-y-0.5 active:translate-y-0.5 focus:translate-y-0.5 px-2 py-1 mr-2 transition duration-300 hover:shadow-md "
            onClick={handleDataInTimeDisplay}
            data-lat={city.coord.lat}
            data-lon={city.coord.lon}
          >
            More
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Table;

Table.propTypes = {
  weather: PropTypes.arrayOf(PropTypes.object),
  handleDataInTimeDisplay: PropTypes.func,
  handleCityDelete: PropTypes.func,
  weatherListRef: PropTypes.any,
};
