const mongoose = require('mongoose');

// MongoDB connection URL (Atlas)


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
