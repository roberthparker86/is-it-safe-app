const express = require('express');
const route = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require('../controllers/authCtrl');

// import validators
const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/authValidator');

// pass controllers to routes
route.post('/signup', userSignupValidator, runValidation, signup);
route.post('/signin', userSigninValidator, runValidation, signin);
route.get('/signout', signout);

// Test?
route.get('/secret', requireSignin, (req, res) => {
  res.json({
    user: req.user
  });
});

module.exports = route;