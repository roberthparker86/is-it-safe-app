const express = require('express');
const route = express.Router();
const { addFood } = require('../controllers/foodCtrl');

route.post('/add-food', addFood);

module.exports = route;