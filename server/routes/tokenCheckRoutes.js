const express = require('express');
const route = express.Router();
const jwt = require('express-jwt');

const jwtParams = {
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
};

route.get('/', jwt(jwtParams),
  (req, res) => {
    
    if (req.cookies.token) {
      return res.status(200);
    } else {
      return res.status(404);
    }
  });

module.exports = route;