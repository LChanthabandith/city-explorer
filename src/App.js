import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

const CityForm = () => {
    const [city, setCity] = useState('');
    const [location, setLocation] = useState(null);
    const [mapUrl, setMapUrl] = useState(null);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState(null);
    const [weather, setWeather] = useState([]);

    const getWeather = async (lat, lon) => {
      try {
          const response = await axios.get('/weather', {
              params: {
                  lat: lat,
                  lon: lon
              }
          });
  
          if (response.status === 200 && response.data) {
              setWeather([response.data]);
          } else {
              console.error("Weather data not found in response.");
          }
      } catch (error) {
          if (error.response) {

              console.error("Error fetching weather data:", error.response.data);
          } else if (error.request) {
           
              console.error("No response received:", error.request);
          } else {
            
              console.error("Error setting up request:", error.message);
          }
      }
  };
  
    const getLocation = async city => {
        try {
            const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
                params: {
                    key: process.env.REACT_APP_LOCATIONIQ_API_KEY,
                    q: city,
                    format: 'json',
                },
            });
            return response.data[0];
        } catch (error) {
            setError({
                status: error.response.status,
                message: error.response.data.error,
            });
            return null;
        }
    };

    const getMap = (lat, lon) => {
        return `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;
    }

    const getMovies = async city => {
        try {
            const response = await axios.get('/movies', {
                params: {
                    city: city
                }
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const handleSubmit = async event => {
      event.preventDefault();
      setError(null);

      if(city.trim() === '') {
          setError({
              status: 'Input Error',
              message: 'Please enter a valid city name.'
          });
          return;
      }

      const locationData = await getLocation(city);
      if (locationData) {
          setLocation(locationData);
          const mapUrl = getMap(locationData.lat, locationData.lon);
          setMapUrl(mapUrl);
          getWeather(locationData.lat, locationData.lon);
          await getMovies(city);
      }
  };

  return (
    <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Explore!
            </Button>
        </Form>

        {error && (
            <Alert variant="danger">
                Error {error.status}: {error.message}
            </Alert>
        )}

        {location && (
            <Card style={{ width: '18rem', marginTop: '20px' }}>
                <Card.Body>
                    <Card.Title>{location.display_name}</Card.Title>
                    <Card.Text>
                        Latitude: {location.lat}
                        <br />
                        Longitude: {location.lon}
                    </Card.Text>
                    {mapUrl && <Image src={mapUrl} />}
                </Card.Body>
            </Card>
        )}

        {weather.map(day => (
            <div key={day.date}>
                {day.date}: {day.description}
            </div>
        ))}

        {movies && movies.map((movie, index) => (
            <Card key={index} style={{ width: '18rem', marginTop: '20px' }}>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        Overview: {movie.overview}
                        <br />
                        Release Date: {movie.release_date}
                        <br />
                        Rating: {movie.vote_average}
                    </Card.Text>
                    <Image src={movie.image_url} />
                </Card.Body>
            </Card>
        ))}
    </>
);
};

export default CityForm;