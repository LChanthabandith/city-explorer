import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const CityForm = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);

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

  const getMap = (lat, lon) => {
    const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10`;
    return mapUrl;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const locationData = await getLocation(city);
    setLocation(locationData);
    const mapUrl = getMap(locationData.lat, locationData.lon);
    setMapUrl(mapUrl);
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
            {mapUrl && <Image src={mapUrl} />}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CityForm;

