import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const bookingData = location.state?.data;

  // Use useEffect to navigate if booking data is missing
  useEffect(() => {
    if (!bookingData || !bookingData._id) {
      navigate('/');
    }
  }, [bookingData, navigate]);  // Only navigate if booking data is missing

  if (!bookingData) {
    return null;
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:5934/api/bookings/${bookingData._id}`)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  const handleEdit = () => {
    navigate(`/book/${bookingData._id}`, { state: { data: bookingData } });
  };

  const handlePayNow = () => {
    axios.get(`http://localhost:5934/api/bookings/${bookingData._id}/generate-receipt`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${bookingData.fullName}_receipt.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Booking Confirmation
      </Typography>
      <Typography variant="h6">Full Name: {bookingData.fullName}</Typography>
      <Typography variant="h6">Email: {bookingData.email}</Typography>
      <Typography variant="h6">Phone: {bookingData.phone}</Typography>
      <Typography variant="h6">Address: {bookingData.address}</Typography>
      <Typography variant="h6">Date: {new Date(bookingData.date).toLocaleDateString()}</Typography>
      <Typography variant="h6">Equipment: {bookingData.equipment.map(eq => eq.name).join(', ')}</Typography>
      <Typography variant="h6">Package: {bookingData.packageName}</Typography>
      <Typography variant="h6">Total Price: ${bookingData.totalPrice}</Typography>

      <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: '20px' }}>
        Edit Booking
      </Button>

      <Button variant="contained" color="secondary" onClick={() => setOpenDialog(true)} style={{ marginTop: '20px', marginLeft: '10px' }}>
        Delete Booking
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this booking?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you will not be able to recover this booking.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={handlePayNow} style={{ marginTop: '20px', marginLeft: '10px' }}>
        Pay Now (Generate Receipt)
      </Button>

      <Button variant="contained" color="default" onClick={() => navigate('/')} style={{ marginTop: '20px', marginLeft: '10px' }}>
        Back to Home
      </Button>
    </div>
  );
};

export default Confirmation;
