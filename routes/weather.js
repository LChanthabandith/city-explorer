const axios = require('axios');

exports.getWeatherData = async (city) => {
    const API_KEY = "86de4b6eda4fb40d873a7b997839161f";
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;

    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        throw error;
    }
};
