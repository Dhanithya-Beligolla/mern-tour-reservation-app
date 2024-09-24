const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  packageName: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  equipment: [{ name: String, price: Number }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
