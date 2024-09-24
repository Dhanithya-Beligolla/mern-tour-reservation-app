import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';

const equipments = [
  { id: '1', name: 'Surfboard', price: 50 },
  { id: '2', name: 'Hiking Gear', price: 75 },
  { id: '3', name: 'City Guide', price: 30 },
];

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    equipment: [],
  });

  const bookingData = location.state?.data; // Get the existing booking data if available (for editing)
  const [totalEquipmentPrice, setTotalEquipmentPrice] = useState(0);
  const { packageName, packagePrice } = bookingData || location.state; // Check for package details or booking data

  useEffect(() => {
    if (bookingData) {
      // Pre-populate form for editing an existing booking
      setFormData({
        fullName: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        address: bookingData.address,
        date: bookingData.date.split('T')[0], // Format date for input field
        equipment: bookingData.equipment,
      });
      setTotalEquipmentPrice(bookingData.equipment.reduce((acc, eq) => acc + eq.price, 0));
    }
  }, [bookingData]);

  const handleCheckboxChange = (event, equipmentItem) => {
    const isChecked = event.target.checked;
    let updatedEquipment = [...formData.equipment];

    if (isChecked) {
      updatedEquipment.push(equipmentItem);
    } else {
      updatedEquipment = updatedEquipment.filter(eq => eq.id !== equipmentItem.id);
    }

    const equipmentPrice = updatedEquipment.reduce((acc, curr) => acc + curr.price, 0);
    setFormData({ ...formData, equipment: updatedEquipment });
    setTotalEquipmentPrice(equipmentPrice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = packagePrice + totalEquipmentPrice;
    const updatedBookingData = {
      ...formData,
      packageName: bookingData?.packageName || packageName,  // Use bookingData if editing, otherwise use passed state
      packagePrice: bookingData?.packagePrice || packagePrice,  // Same for price
      totalPrice,
    };

    if (bookingData?._id) {
      // Edit existing booking (PUT request)
      axios.put(`http://localhost:5934/api/bookings/${bookingData._id}`, updatedBookingData)
        .then((response) => {
          // Navigate to confirmation page with the updated booking data
          navigate('/confirmation', { state: { data: response.data } });
        })
        .catch((error) => {
          console.error('Error updating booking:', error);
        });
    } else {
      // Create new booking (POST request)
      axios.post('http://localhost:5934/api/bookings', updatedBookingData)
        .then((response) => {
          navigate('/confirmation', { state: { data: response.data } });
        })
        .catch((error) => {
          console.error('Error creating booking:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        {bookingData ? `Edit Booking for ${bookingData.packageName}` : `Booking Form for ${packageName}`}
      </Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.fullName}
        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.phone}
        onChange={e => setFormData({ ...formData, phone: e.target.value })}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.address}
        onChange={e => setFormData({ ...formData, address: e.target.value })}
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
        value={formData.date}
        onChange={e => setFormData({ ...formData, date: e.target.value })}
      />

      <Typography variant="subtitle1" gutterBottom>
        Add Equipment:
      </Typography>
      {equipments.map((equipment) => (
        <FormControlLabel
          key={equipment.id}
          control={
            <Checkbox
              checked={formData.equipment.some(eq => eq.id === equipment.id)}
              onChange={(e) => handleCheckboxChange(e, equipment)}
              value={equipment.name}
            />
          }
          label={`${equipment.name} - $${equipment.price}`}
        />
      ))}

      <Typography variant="subtitle1">
        Total Equipment Price: ${totalEquipmentPrice}
      </Typography>
      <Typography variant="h6">Total Price: ${packagePrice + totalEquipmentPrice}</Typography>

      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
        {bookingData ? 'Update Booking' : 'Submit Booking'}
      </Button>
    </form>
  );
};

export default BookingForm;
