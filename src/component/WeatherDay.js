// WeatherDay.js
import React from 'react';

const WeatherDay = ({ day }) => (
  <div>
    Date: Today
    <br />
    Description: {day.description ? day.description : "No description available."}
    <br />
    Temperature: {day.temperature ? day.temperature : "No temperature available."}
  </div>
);

export default WeatherDay;
