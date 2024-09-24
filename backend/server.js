const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection file
const cors = require('cors');
const bodyParser = require('body-parser');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5934;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
