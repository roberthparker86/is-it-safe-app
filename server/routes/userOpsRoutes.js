const express = require('express');
const route = express.Router();
const { addFood } = require('../controllers/foodCtrl');
const { addFoodValidator } = require('../validators/foodOpsValidator');
const { runValidation } = require('../validators');

// route.get('/') /api/ root is general get user info request
route.put('/add-food', addFoodValidator, runValidation, addFood);
route.put('/delete-food', runValidation);

module.exports = route;