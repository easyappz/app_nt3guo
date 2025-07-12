const mongoose = require('mongoose');

// Function to initialize database connection
async function initDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/calculator_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Export the mongoose instance for schema/model definitions
module.exports = {
  mongoose,
  initDb,
};
