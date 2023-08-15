import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Movies from './components/Movies';

const CityForm = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [weather, setWeather] = useState([]);

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get('/weather', {
        params: {
          lat: lat,
          lon: lon
        }
      });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
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
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;
    return url;
  }

  const getMovies = async city => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query: city,
          api_key: process.env.REACT_APP_MOVIE_API_KEY
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (city.trim() === '') {
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

      {weather.map(day => (
        <div key={day.date}>
          {day.date}: {day.description}
        </div>
      ))}

      {error && (
        <Alert variant="danger">
          Error {error.status}: {error.message}
        </Alert>
      )}

      {location && (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{location.display_name}</Card.Title>
            <Card.Text>
              Latitude: {location.lat}
              <br />
              Longitude: {location.lon}
            </Card.Text>
            {mapUrl && <Image src={mapUrl} alt="City Map" />}
          </Card.Body>
        </Card>
      )}

      <Movies movies={movies} />
    </>
  );
};

export default CityForm;
