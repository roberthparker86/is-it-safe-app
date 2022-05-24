const express = require('express');
const route = express.Router();
const { addFood, deleteFood, getFood } = require('../controllers/foodCtrl');
const { addFoodValidator } = require('../validators/foodOpsValidator');
const { runValidation } = require('../validators');

// route.get('/') /api/ root is general get user info request
route.post('/get-food', getFood);
route.put('/add-food', addFoodValidator, runValidation, addFood);
route.post('/delete-food', deleteFood);

module.exports = route;
