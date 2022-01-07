const express = require('express');
const createUser = require('../services/createUserCtrl');
const deleteUser = require('../services/deleteUserCtrl');
const addFoodValidate = require('../../middleware/addFoodValidate');
const loginValidate = require('../../middleware/loginValidate');



const router = express.Router();

router.post('/user', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/getuser/:username', loginValidate);
router.put('/:id/add', addFoodValidate);

module.exports = router;