const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {

  const errors = validationResult(req);

  // error found
  if (!errors.isEmpty()) {
    // Unprocessable entity error sent back
    return res.status(422).json({
      error: errors.array([0]).msg
    });
  }

  next();
};