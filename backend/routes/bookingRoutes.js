const express = require('express');
const {getAllBookings, createBooking, getBooking, updateBooking, deleteBooking, generateReceipt } = require('../controller/bookingController.js');
const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/:id/generate-receipt', generateReceipt);
router.get('/', getAllBookings); 

module.exports = router;

