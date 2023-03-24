const express = require('express');
const route = express.Router();
const {
  signup,
  signin,
  signout,
  getUser,
  checkToken,
  requireSignin
} = require('../controllers/authCtrl');

const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator
} = require('../validators/authValidator');

route.post('/signup', userSignupValidator, runValidation, signup);
route.post('/signin', userSigninValidator, runValidation, signin);
route.get('/signout', signout);
route.get('/user', getUser);
route.get('/check-token', checkToken);

module.exports = route;