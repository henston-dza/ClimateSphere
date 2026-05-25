const { body, param, validationResult } = require('express-validator');

/**
 * Process validation results and return errors if any
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

/**
 * Registration validation chain
 */
const validateRegister = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  handleValidation,
];

/**
 * Login validation chain
 */
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

/**
 * City parameter validation
 */
const validateCity = [
  param('city')
    .trim()
    .notEmpty()
    .withMessage('City name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('City name must be 2-100 characters')
    .matches(/^[a-zA-Z\s\-',\.]+$/)
    .withMessage('City name contains invalid characters'),
  handleValidation,
];

/**
 * Add favorite validation
 */
const validateFavorite = [
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('City name must be 2-100 characters'),
  handleValidation,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCity,
  validateFavorite,
};
