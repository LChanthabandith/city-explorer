require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Default Route for Debugging
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Weather Route
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send("City name is required");
    }
    
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86de4b6eda4fb40d873a7b997839161f`;

    try {
        const response = await axios.get(API_ENDPOINT);
        const weatherData = response.data;

        const description = `${weatherData.weather[0].main} - ${weatherData.weather[0].description}`;
        const temperature = `Temperature: ${weatherData.main.temp}°C`;
        const shapedData = { description, temperature };

        res.json(shapedData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
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
        console.error("Error fetching movie data:", error);
        res.status(500).send("Error fetching movie data");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
