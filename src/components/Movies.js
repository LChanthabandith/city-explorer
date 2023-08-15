import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const Movies = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <>
      {movies.map((movie, index) => (
        <Card key={index} style={{ width: '18rem', marginTop: '20px' }}>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              Overview: {movie.overview}
              <br />
              Release Date: {movie.released_on}
              <br />
              Rating: {movie.average_votes}
            </Card.Text>
            <Image src={movie.image_url} />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Movies;
