import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

const CityForm = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [mapUrl, setMapUrl] = useState(null);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState(null);
    const [weather, setWeather] = useState([]);

    const getWeather = async (city) => {
      try {
          const API_KEY = "86de4b6eda4fb40d873a7b997839161f";
          const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;
          
          const response = await axios.get(ENDPOINT);

          if (response.status === 200 && response.data) {
              setWeather([{
                  description: response.data.weather[0].description,
                  temperature: `${response.data.main.temp}°F`
              }]);
          } else {
              console.error("Weather data not found in response.");
          }
      } catch (error) {
          console.error("Error fetching weather data:", error?.response?.data || "Unknown error");
          setError({
              status: error?.response?.status || "Error",
              message: error?.response?.data?.message || 'Something went wrong fetching the weather.'
          });
      }
  };

    const getLocation = async city => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const getMap = (lat, lon) => {
        return `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;
    }

    const getMovies = async () => {
      try {
          const API_KEY = "c1f4456f";
          const currentYear = new Date().getFullYear();
          const ENDPOINT = `https://www.omdbapi.com/?s=${currentYear}&apikey=${API_KEY}&type=movie&y=${currentYear}`;
  
          const response = await axios.get(ENDPOINT);
  
          if (response.data.Response === "True" && response.data.Search) {
              setMovies(response.data.Search);
          } else {
              console.error("Movies data not found in response.");
          }
      } catch (error) {
          console.error("Error fetching movie data:", error?.response?.data || "Unknown error");
          setError({
              status: error?.response?.status || "Error",
              message: error?.response?.data?.Error || 'Something went wrong fetching the movies.'
          });
      }
  };
  
  

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);

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
        await getWeather(city);
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

      {loading && <p>Loading...</p>}

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

      {weather && weather.map((day, index) => (
          <div key={index}>
              Date: Today
              <br />
              Description: {day.description ? day.description : "No description available."}
              <br />
              Temperature: {day.temperature ? day.temperature : "No temperature available."}
          </div>
      ))}

{movies && movies.map((movie, index) => (
    <Card key={index} style={{ width: '18rem', marginTop: '20px' }}>
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
                Year: {movie.Year}
                <br />
            </Card.Text>
            <Image src={movie.Poster} />
        </Card.Body>
    </Card>
))}

  </>
);
};

export default CityForm;