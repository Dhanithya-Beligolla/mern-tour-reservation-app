const Booking = require('../models/Booking');
const PDFDocument = require('pdfkit');
const path = require('path');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { fullName, email, phone, address, date, packageName, packagePrice, equipment, totalPrice } = req.body;
  
    try {
      const newBooking = new Booking({
        fullName,
        email,
        phone,
        address,
        date,
        packageName,
        packagePrice,
        equipment,
        totalPrice
      });
      await newBooking.save();
      res.json(newBooking);
    } catch (error) {
      res.status(500).json({ error: 'Server error while creating booking' });
    }
  };
  
  // Update an existing booking
  exports.updateBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: 'Server error while updating booking' });
    }
  };

// Get booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

// Delete an existing booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};

// Generate PDF receipt for booking
exports.generateReceipt = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const doc = new PDFDocument();
    let filename = `${booking.fullName}_receipt.pdf`;
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.text(`Receipt for ${booking.packageName}`, 100, 100);
    doc.text(`Full Name: ${booking.fullName}`, 100, 150);
    doc.text(`Email: ${booking.email}`, 100, 180);
    doc.text(`Phone: ${booking.phone}`, 100, 210);
    doc.text(`Total Price: $${booking.totalPrice}`, 100, 240);
    
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
};

// Get all bookings

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
  