const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`, {
            params: {
                lat: lat,
                lon: lon,
                key: process.env.WEATHERBIT_API_KEY
            }
        });
        
        const weatherData = {
            description: response.data.data[0].weather.description,
            date: response.data.data[0].valid_date
        };

        res.json(weatherData);

    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.get('/movies', async (req, res) => {
    const { city } = req.query;

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query: city,
                api_key: process.env.TMDB_API_KEY
            }
        });
        
        const movies = response.data.results.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path
        }));

        res.json(movies);

    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
