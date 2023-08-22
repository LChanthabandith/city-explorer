import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const Movie = ({ movie }) => (
  <Card style={{ width: '18rem', marginTop: '20px' }}>
    <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
            Year: {movie.Year}
            <br />
        </Card.Text>
        <Image src={movie.Poster} />
    </Card.Body>
  </Card>
);

export default Movie;
