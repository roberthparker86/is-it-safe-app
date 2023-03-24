const User = require('../models/userData');
// const shortId = require('shortid');
const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
const dayjs = require('dayjs');
const { use } = require('../routes/userAuthRoutes');

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

    const { firstName, email, password } = req.body;

    let newUser = new User({ firstName, email, password });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      res.status(201).json({
        message: 'Signup successfull.',
        success: success.firstName
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

    // TODO: name cookie so we can see it in browser
    const token = jwt.sign({
      name: 'SESSION_COOKIE',
      _id: user._id 
    }, process.env.JWT_SECRET, {
      expiresIn: '1 hour' 
    });

    const userReturnData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      freezer: user.freezer,
      refrigerator: user.refrigerator,
      timestamp: dayjs()
    };

    if (token) {
      return  res
        .status(201)
        .cookie('token', token, { 
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        })
        .cookie('user', user._id, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: new Date(Date.now() + 3600000)
        })
        .json({
          message: 'Auth Cookie created!',
          user: userReturnData,
          success: true
        });
    }

    return res
      .status(500)
      .json({ 
        message: 'Auth Cookie not created!', 
        success: false 
      });
  });
};

exports.checkToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res
    .status(401)
    .json({ success: false })
    .send({ error: 'Access denied. No token provided.' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false })
      .send({ error: 'Access denied. Invalid token.' });
  }  
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('user');
  res.status(200).json({
    message: 'You are now signed out.'
  });
};

exports.getUser = (req, res) => {
  // TODO check account id
  const _ID = req.cookies.user,
    token = req.cookies.token;

  if (!token) return res.status(401).send({ error: 'Access denied. No token provided.' });

  if (!_ID) return res.status(401).send({ error: 'No user id cookie.' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    User.findById({ _id: _ID }).exec((err, user) => {
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

      const userData = {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        refrigerator: user.refrigerator,
        freezer: user.freezer
      };
  
      return res.status(200).json({ user: userData });
    });
  } catch (err) {
    return res.status(401).send({ error: 'Access denied. Invalid token.' });
  }
};

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
