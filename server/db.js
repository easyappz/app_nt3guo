const mongoose = require('mongoose');

// Placeholder for future database schemas and models

// Function to check database connection status
const checkDbConnection = () => {
  return mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
};

module.exports = {
  checkDbConnection
};
