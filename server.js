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
        const response = await axios.get('https://api.weatherbit.io/v2.0/forecast/daily', {
            params: {
                lat: lat,
                lon: lon,
                key: process.env.WEATHERBIT_API_KEY
            }
        });
        
        const weatherData = {
            description: response.data.data[0].weather.description,
            date: new Date(response.data.data[0].datetime).toISOString().split('T')[0]
        };

        res.json(weatherData);

    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

class Movie {
    constructor(data) {
        this.title = data.title;
        this.overview = data.overview;
        this.average_votes = data.vote_average.toString();
        this.total_votes = data.vote_count.toString();
        this.image_url = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        this.popularity = data.popularity.toString();
        this.released_on = data.release_date;
    }
}

app.get('/movies', async (req, res) => {
    const city = req.query.city;

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query: city,
                api_key: process.env.MOVIE_API_KEY
            }
        });

        const moviesData = response.data.results.map(movie => new Movie(movie));

        res.status(200).json(moviesData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch movie data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

