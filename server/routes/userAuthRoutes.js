const express = require('express');
const route = express.Router();
const {
  signup,
  signin,
  signout,
  getUser,
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
route.get('/user', getUser);

module.exports = route;