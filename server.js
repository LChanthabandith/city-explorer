const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

// Weather Route
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).send("Latitude and Longitude are required");
    }

    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${process.env.WEATHER_API_KEY}`;

    try {
        const response = await axios.get(API_ENDPOINT);
        const dailyData = response.data.daily;

        const shapedData = dailyData.map(day => {
            const date = new Date(day.dt * 1000).toISOString().split('T')[0];
            const description = `Low of ${day.temp.min}, high of ${day.temp.max} with ${day.weather[0].description}`;
            return { description, date };
        });

        res.json(shapedData);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

// Movie Route
const MOVIE_API_BASE_URL = "https://api.themoviedb.org/3/search/movie";

app.get('/movies', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send("City is required");
    }

    try {
        const response = await axios.get(MOVIE_API_BASE_URL, {
            params: {
                api_key: process.env.MOVIE_API_KEY,
                query: city,
                include_adult: false
            }
        });

        const movies = response.data.results.map(movie => {
            return {
                title: movie.title,
                overview: movie.overview,
                average_votes: movie.vote_average.toString(),
                total_votes: movie.vote_count.toString(),
                image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                popularity: movie.popularity.toString(),
                released_on: movie.release_date
            };
        });

        res.json(movies);
    } catch (error) {
        res.status(500).send("Error fetching movie data");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
