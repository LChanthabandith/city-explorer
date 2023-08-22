// Movies.js
import React from 'react';
import Movie from './Movie';

const Movies = ({ moviesData }) => (
  <div>
    {moviesData && moviesData.map((movie, index) => (
      <Movie key={index} movie={movie} />
    ))}
  </div>
);

export default Movies;
