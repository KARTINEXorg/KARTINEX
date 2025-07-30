const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// सुनिश्चित करो कि यह रास्ता सही है
const User = require('../models/user.js'); // 'User.js' को 'user.js' कर दिया

// Signup Route
router.post('/signup', async (req, res) => {
    // ... (बाकी का कोड पहले जैसा ही) ...
});

// Login Route
router.post('/login', async (req, res) => {
   // ... (बाकी का कोड पहले जैसा ही) ...
});

module.exports = router;
