const axios = require('axios');

exports.getWeatherData = async (city) => {
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;

    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        throw error;
    }
};
