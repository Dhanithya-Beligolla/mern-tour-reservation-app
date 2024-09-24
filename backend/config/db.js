const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://DhanithyaIT22085580:it22085580@clusterpoojaindians.bmcgbys.mongodb.net/tour_reservation?retryWrites=true&w=majority';
//const mongoURI = 'mongodb+srv://dinitha:dinitha@ceylonodyssey.fbkyl.mongodb.net/ceylon_db?retryWrites=true&w=majority&appName=CeylonOdyssey';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
