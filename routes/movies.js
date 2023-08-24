const axios = require('axios');

exports.getMovieData = async (year) => {
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const ENDPOINT = `https://www.omdbapi.com/?s=${year}&apikey=${API_KEY}&type=movie&y=${year}`;

    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        throw error;
    }
};
