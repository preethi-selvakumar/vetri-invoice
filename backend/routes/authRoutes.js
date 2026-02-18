const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Signup Route: /api/auth/register
router.post('/register', register);

// Login Route: /api/auth/login
router.post('/login', login);

module.exports = router;