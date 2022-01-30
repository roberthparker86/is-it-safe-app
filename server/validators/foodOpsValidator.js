const { body } = require('express-validator');

exports.addFoodValidator = [
  
  body('id')
    .exists({ checkFalsy: true })
    .withMessage("Invalid inputs: must be a string of valid characters."),
  body('name')
    .exists({ checkFalsy: true })
    .withMessage("Invalid input: must be a string of valid characters."),
  body('startTime')
    .isInt()
    .withMessage('Invalid input: must be an integer'),
    body('expireTime')
    .isInt()
    .withMessage('Invalid input: must be an integer'),
];