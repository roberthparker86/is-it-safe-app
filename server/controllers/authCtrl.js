const User = require("../models/userData");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// user signup
exports.signup = (req, res) => {

  User.findOne({ email: req.body.email }).exec((err, user) => {

    // Handle any unforseen errors
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    // If user exists return 404 status and error
    if (user) {
      return res.status(400).json({
        error: "Email is already taken"
      });
    }

    const { firstName, lastName, email, password } = req.body;

    // No errors and user not found. Create new user.
    let newUser = new User({ firstName, lastName, email, password });

    newUser.save((err, success) => {

      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      res.status(200).json({
        message: "Signup successfull. Please login."
      });
    });
  });
};

// user signin
exports.signin = (req, res) => {

  const { email, password } = req.body;

  
  User.findOne({ email }).exec((err, user) => {

    // check user existance
    if (!user) {
      return res.status(404).json({
        error: 'User with that email does not exist. Please try again or signup.',
        email,
        password
      });
    }

    // handle any other errors
    if (err) {
      return res.status(400).json({
        error: err,
        email,
        password
      });
    }

    // authentication returns false
    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: 'Email and password do not match. Please try again',
        email,
        password
      });
    }

    // authentication returns true
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.cookie('token', token, { httpOnly: true });

    return token ? 
      res.status(201).json({ message: "Auth Cookie created!"}) 
      : res.status(500).json({ message: "Auth Cookie not created!"});
  });
};

exports.signout = (req, res) => {

  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successful.'
  });
};

exports.getUser = (req, res) => {

    const id = req._id;

    User.findById({ _id }).exec((err, user) => {

        // User not found
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // other errors
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

  const authUserId = req.user._id

  User.findById({ _id: authUserId }).exec((err, user) => {

    // user not found
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    // other errors
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

    // user not found
    if (!user) {
      return res.status(400).json({
        error: 'Admin user not found'
      });
    }

    // other errors
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    next();
  });
};