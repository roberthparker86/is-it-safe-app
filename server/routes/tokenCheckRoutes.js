const express = require('express');
const route = express.Router();
const jwt = require('express-jwt');

const jwtParams = {
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
};

route.post('/token', jwt(jwtParams),
  (req, res) => {
    console.log({ req, test: 'Test yo' });
    if (req.cookies.token) {
      return res.status(200);
    } else {
      return res.status(404);
    }
  });

module.exports = route;