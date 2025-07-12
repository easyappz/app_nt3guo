const express = require('express');
const router = express.Router();

// Placeholder route for future calculator API
router.get('/calculator', (req, res) => {
  res.status(200).json({ message: 'Calculator API endpoint is not yet implemented' });
});

// Add more routes as needed for future expansion
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

module.exports = router;
