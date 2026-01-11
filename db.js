const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL;

async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log(" Connected to MongoDB Atlas");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); // stop app if DB fails
  }
}

connectDB();

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
