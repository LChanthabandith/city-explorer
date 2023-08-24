const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const weather = require('./routes/weather');
const movies = require('./routes/movies');
const yelp = require('./routes/yelp');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const dataCache = {};
const RECENT_THRESHOLD = 300000;

const isDataRecent = (timestamp) => {
    return new Date().getTime() - timestamp <= RECENT_THRESHOLD;
};

app.use(cors());

app.get('/yelp/:city', async (req, res) => {
    const city = req.params.city;
  
    if (dataCache[city] && dataCache[city].yelp && isDataRecent(dataCache[city].timestamp)) {
      return res.json(dataCache[city].yelp);
    }
  
    try {
      const yelpData = await yelp.getYelpData(city);
      dataCache[city] = { ...dataCache[city], yelp: yelpData, timestamp: new Date().getTime() };
      res.json(yelpData);
    } catch (error) {
      console.error("Error fetching Yelp data:", error);  // Log the error for debugging
      res.status(500).send('Error fetching Yelp data');
    }
});



app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;

        if (dataCache[city] && dataCache[city].weather && isDataRecent(dataCache[city].timestamp)) {
            return res.json(dataCache[city].weather);
        }

        const data = await weather.getWeatherData(city);
        dataCache[city] = { ...dataCache[city], weather: data, timestamp: new Date().getTime() };
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch weather data' });
    }
});

app.get('/movies/:city', async (req, res) => {
    try {
        const city = req.params.city;

        if (dataCache[city] && dataCache[city].movies && isDataRecent(dataCache[city].timestamp)) {
            return res.json(dataCache[city].movies);
        }

        const data = await movies.getMovieData(city);
        dataCache[city] = { ...dataCache[city], movies: data, timestamp: new Date().getTime() };
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movie data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
