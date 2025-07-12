const express = require('express');
const router = express.Router();

// Placeholder for future API endpoints
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is ready for calculator integration',
    endpoints: []
  });
});

module.exports = router;
