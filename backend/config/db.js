const mongoose = require('mongoose');

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      'MongoDB connected:',
      connection.connection.host,
      connection.connection.name
    );

    return connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = connectDB;