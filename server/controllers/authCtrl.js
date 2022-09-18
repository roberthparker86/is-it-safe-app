const User = require('../models/userData');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dayjs = require('dayjs');

/**
 * NOTE: knock out the JWT for now. A simple hashed password is enough
 * for this app. Will implement more later.
 */

// user signup
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {

    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    if (user) {
      return res.status(409).json({
        error: 'Email is already taken'
      });
    }

    const { firstName, lastName, email, password } = req.body;

    let newUser = new User({ firstName, lastName, email, password });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      res.status(201).json({
        message: 'Signup successfull.'
      });
    });
  });
};

// user signin
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (!user) {
      return res.status(404).json({
        error:
          'User with that email does not exist. Please try again or signup.',
        email,
        password
      });
    }

    if (err) {
      return res.status(400).json({
        error: err,
        email,
        password
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: 'Email and password do not match. Please try again',
        email,
        password
      });
    }

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h'
    // });

    const userReturnData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      freezer: user.freezer,
      refrigerator: user.refrigerator,
      timestamp: dayjs()
    };

    return res.status(200).json({ user: userReturnData });

    // res.cookie('token', token, { httpOnly: true });
    // res.json({ user: userReturnData });

    // if (token) {
    //   return res.status(201).cookie('token', token, { httpOnly: true }).json({
    //     message: 'Auth Cookie created!',
    //     user: userReturnData
    //   });
    // }
    // return res.status(500).json({ message: 'Auth Cookie not created!' });
  });
};

exports.signout = (req, res) => {
  // res.clearCookie('token');
  res.status(200).json({
    message: 'You are now signed out.'
  });
};

exports.getUser = (req, res) => {
  const id = req._id;

  User.findById({ _id }).exec((err, user) => {
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      data: user
    });
  });
};

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"]
// });

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;

  User.findById({ _id: authUserId }).exec((err, user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;

  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (!user) {
      return res.status(400).json({
        error: 'Admin user not found'
      });
    }

    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    next();
  });
};
