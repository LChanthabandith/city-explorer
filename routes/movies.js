const axios = require('axios');

exports.getMovieData = async (year) => {
    const API_KEY = "c1f4456f";
    const ENDPOINT = `https://www.omdbapi.com/?s=${year}&apikey=${API_KEY}&type=movie&y=${year}`;

    try {
        const response = await axios.get(ENDPOINT);
        return response.data;
    } catch (error) {
        throw error;
    }
};
