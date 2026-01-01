const mongoose = require('mongoose');
require('dotenv').config()

// MongoDB connection URL (Atlas)
const mongoURL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoURL);

// Connection instance
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log(' MongoDB disconnected');
});

// Export database connection
module.exports = db;
