import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TextField,  Button } from '@mui/material';
import './Booking.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  useEffect(() => {
    // Fetch all bookings from the backend API
    axios.get('http://localhost:5934/api/bookings')  // Ensure the correct backend URL is used
      .then(response => {
        setBookings(response.data);  // Set the fetched bookings in state
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5934/api/bookings/${id}`)
      .then(() => {
        setBookings(bookings.filter(booking => booking._id !== id));
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  // Filter bookings based on search inputs
  const filteredBookings = bookings.filter(booking => 
    booking.email.includes(searchEmail) && booking.phone.includes(searchPhone)
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>All Bookings</Typography>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <TextField
          label="Search by Email"
          variant="outlined"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ flex: 1 }}
        />
        <TextField
          label="Search by Phone"
          variant="outlined"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="light-blue-column">Full Name</TableCell>
              <TableCell className="light-blue-column">Email</TableCell>
              <TableCell className="light-blue-column">Phone</TableCell>
              <TableCell className="light-blue-column">Package Name</TableCell>
              <TableCell className="light-blue-column">Package Price</TableCell>
              <TableCell className="light-blue-column">Total Price</TableCell>
              <TableCell className="light-blue-column">Date</TableCell>
              <TableCell className="light-blue-column">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.fullName}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.packageName}</TableCell>
                <TableCell>{booking.packagePrice}</TableCell>
                <TableCell>{booking.totalPrice}</TableCell>
                <TableCell>{new Date(booking.date).toISOString().split('T')[0]}</TableCell>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(booking._id)}
                    style={{ backgroundColor: 'red' }}
                  >
                    Delete
                  </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingList;