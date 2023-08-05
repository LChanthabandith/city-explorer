import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const CityForm = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);

  const getLocation = async city => {
    const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
      params: {
        key: process.env.REACT_APP_LOCATIONIQ_API_KEY,
        q: city,
        format: 'json',
      },
    });
    return response.data[0];
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const locationData = await getLocation(city);
    setLocation(locationData);
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

      {location && (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{location.display_name}</Card.Title>
            <Card.Text>
              Latitude: {location.lat}
              <br />
              Longitude: {location.lon}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CityForm;

