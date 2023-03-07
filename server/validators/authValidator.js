const { check } = require('express-validator');

exports.userSignupValidator = [
  // check name field valid
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid mail address'),
  // check password field valid
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

exports.userSigninValidator = [
  // check email field valid
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  // check password field valid
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];