// Weather.js
import React from 'react';
import WeatherDay from './WeatherDay';

const Weather = ({ weatherData }) => (
  <div>
    {weatherData && weatherData.map((day, index) => (
      <WeatherDay key={index} day={day} />
    ))}
  </div>
);

export default Weather;
