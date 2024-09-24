import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Container, StyledButton } from '../styles/commonStyles';

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from the backend API
    axios.get('http://localhost:5934/api/packages')
      .then((response) => {
        setPackages(response.data);  // Set the fetched packages into state
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });
  }, []);

  return (
    <>
    <Container>
      <Typography variant="h4" gutterBottom>
        Tour Packages
      </Typography>
      {packages.map(pkg => (
        <Card key={pkg._id} style={{ margin: '20px', padding: '20px' }}>
          <CardContent>
            <Typography variant="h5">{pkg.name}</Typography>
            <Typography variant="body2">{pkg.description}</Typography>
            <Typography variant="subtitle1">Price: ${pkg.price}</Typography>
            <Link to={`/book/${pkg._id}`} state={{ packageName: pkg.name, packagePrice: pkg.price }}>
              <StyledButton>Book Now</StyledButton>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Container>
    <Link to="/bookings">
  <Button variant="contained" color="secondary">
    View All Bookings
  </Button>
  </Link>
    </>
  );
};

export default PackageList;
