const express = require('express');
const route = express.Router();
const { addFood } = require('../controllers/foodCtrl');

// route.get('/') /api/ root is general get user info request
route.put('/add-food', addFood);

module.exports = route;