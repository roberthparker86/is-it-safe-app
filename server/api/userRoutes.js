const express = require('express');
const createUser = require('../services/createUserCtrl');
const deleteUser = require('../services/deleteUserCtrl');
const getUser = require('../services/getUserCtrl');
const addFood = require('../services/addFoodCtrl');


const router = express.Router();

router.post('/user', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/getuser/:username', getUser);
router.put('/:id/add', addFood);

module.exports = router;