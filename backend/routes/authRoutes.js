const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');

// @route   POST /api/auth/register
router.post('/register', authLimiter, validateRegister, register);

// @route   POST /api/auth/login
router.post('/login', authLimiter, validateLogin, login);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

// @route   GET /api/auth/logout
router.get('/logout', logout);

module.exports = router;
