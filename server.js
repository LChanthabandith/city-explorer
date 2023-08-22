const express = require('express');
const weather = require('./weather');
const movies = require('./movies');

const app = express();
const PORT = 3000;

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const data = await weather.getWeatherData(city);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch weather data' });
    }
});

app.get('/movies', async (req, res) => {
    try {
        const year = new Date().getFullYear();
        const data = await movies.getMovieData(year);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movie data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
